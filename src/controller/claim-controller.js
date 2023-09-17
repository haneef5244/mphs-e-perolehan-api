const { decodeToken } = require("../helper/authDecode");
const { BlobServiceClient, generateBlobSASQueryParameters, StorageSharedKeyCredential, BlobSASPermissions } = require("@azure/storage-blob");
const { User, Department, Role, Bank } = require("../models");
const sequelize = require('sequelize')
const moment = require("moment");
const { sendUpdateForClaim, sendPaymentMadeMail, sendClaimRequireApproval } = require("../service/emailService");
const { uploadReceipt, uploadPaymentReceipt } = require("../service/upload");
const { notifySubmittedClaim, notifyPaymentPendingClaim, notifyApprovalClaim } = require("../service/notificationService");

const getBalance = async (req, res) => {
    try {
        let resp = {};
        let { id } = decodeToken(req);
        let claimDetails = await UserClaim.findOne({
            where: {
                userId: id,
                year: moment().format('YYYY')
            }
        });
        let claims = await Claim.findAll({
            where: {
                isAmountImbursed: {
                    [sequelize.Op.not]: true
                },
                isAdmin1Approved: {
                    [sequelize.Op.not]: false
                },
                isAdmin2Approved: {
                    [sequelize.Op.not]: false
                },
                isSetiausahaApproved: {
                    [sequelize.Op.not]: false
                },
                userId: id,
            }
        })
        if (claimDetails) {
            resp.sebenar = {
                jumlahPeruntukan: claimDetails.dataValues.jumlahPeruntukan,
                bakiPeruntukan: claimDetails.dataValues.bakiPeruntukan
            }
            let anggaranBaki = Number(claimDetails.dataValues.bakiPeruntukan);
            if (claims) {
                for (let claim of claims) {
                    anggaranBaki = Number(anggaranBaki) - Number(claim.amount);
                }
            }
            resp.anggaran = {
                jumlahPeruntukan: claimDetails.dataValues.jumlahPeruntukan,
                bakiPeruntukan: anggaranBaki
            }
            return res.status(200).json({ message: 'Detail claim dijumpai!', data: resp })
        }
        return res.status(204).json({ message: 'Maklumat claim tidak dapat dijumpa.' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const submitPastClaim = async (req, res) => {
    try {
        let { id, role } = decodeToken(req);
        if (role.name == 'ADMIN 1') {
            const { userId, amaunTuntutan, tarikhTuntutan, admin2Approver, setiausahaApprover } = req.body;

            const resitKlinik = req.files.resitKlinik[0];
            const resitPembayaran = req.files.resitPembayaran[0];

            let resitKlinikBlobName = await uploadReceipt(resitKlinik.originalname, resitKlinik.buffer, resitKlinik.size);
            let resitPembayaranBlobName = await uploadPaymentReceipt(resitPembayaran.originalname, resitPembayaran.buffer, resitPembayaran.size);

            let userClaim = await UserClaim.findOne({
                where: {
                    userId: userId,
                    year: moment(tarikhTuntutan).format('YYYY')
                }
            })

            if (!userClaim) {
                await UserClaim.create({
                    jumlahPeruntukan: 704,
                    bakiPeruntukan: 704 - Number(amaunTuntutan),
                    year: moment(tarikhTuntutan).format('YYYY'),
                })
            } else {
                userClaim.bakiPeruntukan = userClaim.bakiPeruntukan - amaunTuntutan
                if (Number(userClaim.bakiPeruntukan) < 0) {
                    return res.status(500).json({ message: 'Tuntutan melebihi baki peruntukan!' })
                }
                userClaim.save();
            }
            let newClaim = await Claim.create({
                userId: userId,
                setiausahaApproverId: setiausahaApprover,
                isSetiausahaApproved: true,
                setiausahaApprovedAt: tarikhTuntutan,
                admin1ApproverId: id,
                isAdmin1Approved: true,
                admin1ApprovedAt: tarikhTuntutan,
                admin2ApprovedAt: tarikhTuntutan,
                admin2ApproverId: admin2Approver,
                isAdmin2Approved: true,
                isAmountImbursed: true,
                amountImbursedAt: tarikhTuntutan,
                paymentReceipt: resitPembayaranBlobName,
                amount: amaunTuntutan,
                receipt: resitKlinikBlobName,
                createdAt: tarikhTuntutan,
            });
            return res.status(201).json({ message: `Tuntutan anda telah diterima. No. rujukan anda ialah ${newClaim.dataValues.referenceNo}. Sila tunggu pengesahan dari JPK dan Setiausaha.` });
        }
        return res.status(401).json({ message: 'Unauthorized!' })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }


}

const submit = async (req, res) => {
    try {
        const { bakiPeruntukan, amaun } = req.body;
        const file = req.files.file[0];
        let { id, namaPertama, namaTerakhir } = decodeToken(req);

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CLAIM_CONTAINER_NAME);

        const blobName = `${new Date().getTime()}_${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(file.buffer, file.size);

        const blobUrl = uploadBlobResponse._response.request.url;
        const newClaim = await Claim.create({
            userId: id,
            amount: amaun,
            receipt: blobName
        });
        notifySubmittedClaim(namaPertama + ' ' + namaTerakhir, 'ADMIN 1');
        sendClaimRequireApproval({
            namaPertama: namaPertama + ' ' + namaTerakhir,
            referenceNo: newClaim.referenceNo,
            amaun
        }, 'ADMIN 1')
        return res.status(201).json({ message: `Tuntutan anda telah diterima. No. rujukan anda ialah ${newClaim.dataValues.referenceNo}. Sila tunggu pengesahan dari JPK dan Setiausaha.` });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }

}

const getClaimHistoryByUserId = async (req, res) => {
    try {
        let { id } = decodeToken(req);

        const claims = await Claim.findAll({
            attributes: [
                'id',
                [sequelize.literal(`CASE WHEN "isAdmin1Approved" is null THEN 'Pending Admin 1 Approval'
                WHEN "isAdmin1Approved" = false THEN 'Rejected by Admin 1'
                WHEN "isAdmin2Approved" is null THEN 'Pending Admin 2 Approval'
                WHEN "isAdmin2Approved" = false THEN 'Rejected By Admin 2'
                WHEN "isSetiausahaApproved" is null THEN 'Pending SU Approval'
                WHEN "isSetiausahaApproved" = false THEN 'Rejected by SU'
                WHEN "isAmountImbursed" is null THEN 'Pending Payment'
                ELSE 'Completed' 
                END`), 'status'],
                ['createdAt', 'tarikhPermohonan'],
                ['amount', 'amaun'],
                'referenceNo'
            ],
            where: {
                userId: id
            }
        })

        if (claims) {
            for (let claim of claims) {
                claim.dataValues.tarikhPermohonan = moment(claim.dataValues.tarikhPermohonan).format('DD MMM YYYY')
            }
        }

        return res.status(200).json({
            message: 'Tuntutan dijumpai.',
            data: claims
        })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getClaimsByUserId = async (req, res) => {
    try {
        let { role, id } = decodeToken(req);
        let { userId } = req.params;
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name) || userId == id) {
            const userClaim = await UserClaim.findOne({
                where: {
                    userId
                }
            })
            const claims = await Claim.findAll({
                attributes: [
                    'id',
                    [sequelize.literal(`CASE WHEN "isAdmin1Approved" is null THEN 'Pending Admin 1 Approval'
                    WHEN "isAdmin1Approved" = false THEN 'Rejected by Admin 1'
                    WHEN "isAdmin2Approved" is null THEN 'Pending Admin 2 Approval'
                    WHEN "isAdmin2Approved" = false THEN 'Rejected by Admin 2'
                    WHEN "isSetiausahaApproved" is null THEN 'Pending SU Approval'
                    WHEN "isSetiausahaApproved" = false THEN 'Rejected by SU'
                    WHEN "isAmountImbursed" is null THEN 'Pending Payment'
                    ELSE 'Completed' 
                    END`), 'status'],
                    'referenceNo',
                    ['createdAt', 'tarikhPermohonan'],
                    ['amount', 'amaun'],
                    'admin1ApprovedAt',
                    'admin1Remarks',
                    'admin2ApprovedAt',
                    'admin2Remarks',
                    'setiausahaApprovedAt',
                    'setiausahaRemarks',
                    'amountImbursedAt',
                    'isAdmin2Approved',
                    'isSetiausahaApproved'
                ],
                where: {
                    userId,
                },
                include: [{
                    model: User,
                    as: 'user',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'kadPengenalan',
                        'noAkaun',
                        'phone',
                        'jawatan'
                    ],
                    include: [{
                        model: Department,
                        as: 'department'
                    }, {
                        model: Bank,
                        as: 'bank',
                    }]
                }, {
                    model: User,
                    as: 'admin1Approver',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                    ]
                }, {
                    model: User,
                    as: 'admin2Approver',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'jawatan',
                    ]
                }, {
                    model: User,
                    as: 'setiausahaApprover',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir'
                    ]
                }]
            })

            if (claims) {
                for (let claim of claims) {
                    claim.dataValues.bakiPeruntukan = userClaim.bakiPeruntukan
                    claim.dataValues.tarikhPermohonan = moment(claim.dataValues.tarikhPermohonan).format('DD MMM YYYY')
                    claim.dataValues.admin1ApprovedAt = claim.dataValues.admin1ApprovedAt ? moment(claim.dataValues.admin1ApprovedAt).format('DD MMM YYYY') : null;
                    claim.dataValues.admin2ApprovedAt = claim.dataValues.admin2ApprovedAt ? moment(claim.dataValues.admin2ApprovedAt).format('DD MMM YYYY') : null;
                    claim.dataValues.setiausahaApprovedAt = claim.dataValues.setiausahaApprovedAt ? moment(claim.dataValues.setiausahaApprovedAt).format('DD MMM YYYY') : null;
                }
            }

            return res.status(200).json({
                message: 'Tuntutan dijumpai.',
                data: claims
            })
        }
        return res.status(401).json({ message: 'Unauthorized!' });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getMonthlyClaimsByUserId = async (req, res) => {
    try {
        const { id } = decodeToken(req);

        const { pastMonth } = req.params;

        let claims = await Claim.findAll({
            where: {
                [sequelize.Op.and]: [
                    {
                        createdAt: {
                            [sequelize.Op.gte]: moment().subtract(pastMonth, 'months').startOf('month').toDate()
                        }
                    },
                    {
                        createdAt: {
                            [sequelize.Op.lte]: moment().toDate()
                        }
                    },
                    {
                        userId: id
                    },
                ]
            }
        })
        let startDate = moment().subtract(pastMonth, 'months').startOf('month');
        const currentMonth = moment().startOf('month');
        let data = [];
        while (startDate.isSameOrBefore(currentMonth)) {
            let currentMonthClaims = claims.filter(e => moment(e.createdAt).format('MM') == moment(startDate).format('MM'));
            let currentMonthCompletedClaims = currentMonthClaims.filter(e => e.isAmountImbursed);

            console.log(`startDate `, startDate)
            data.push({
                date: moment(startDate).startOf('month').format('DD MMM YYYY'),
                amountClaimed: currentMonthClaims.length ? currentMonthClaims.reduce((total, item) => total + item.amount, 0) : 0,
                amountCompletedClaimed: currentMonthCompletedClaims.length ? currentMonthCompletedClaims.reduce((total, item) => total + item.amount, 0) : 0,
            })
            startDate = startDate.add(1, 'month')
        }
        return res.status(200).json({ message: 'Successfully retrieved!', data })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getApprovalList = async (req, res) => {
    try {

        const { id, role } = decodeToken(req);

        if (role.name == 'SETIAUSAHA') {
            let claims = await Claim.findAll({
                where: {
                    isAdmin1Approved: true,
                    isAdmin2Approved: true,
                    isSetiausahaApproved: null,
                },
                include: {
                    model: User,
                    as: "user",
                    include: [{
                        model: Department,
                        as: 'department'
                    }, {
                        model: Bank,
                        as: 'bank'
                    }],
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'kadPengenalan',
                        'jawatan',
                        'noAkaun',
                        'phone',
                    ],
                    where: {
                        isActive: true
                    },
                    required: true
                }
            })
            return res.status(200).json({ message: 'Successfully retrieved approval list!', data: claims })
        } else if (role.name == 'ADMIN 1') {
            let claims = await Claim.findAll({
                where: {
                    isAdmin1Approved: null,
                },
                include: {
                    model: User,
                    as: "user",
                    include: [{
                        model: Department,
                        as: 'department'
                    }, {
                        model: Bank,
                        as: 'bank'
                    }],
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'kadPengenalan',
                        'jawatan',
                        'noAkaun',
                        'phone',
                    ],
                    where: {
                        isActive: true
                    },
                    required: true
                }
            })
            return res.status(200).json({ message: 'Successfully retrieved approval list!', data: claims })
        } else if (role.name == 'ADMIN 2') {
            let claims = await Claim.findAll({
                where: {
                    isAdmin2Approved: null,
                    isAdmin1Approved: true,
                },
                include: {
                    model: User,
                    as: "user",
                    include: [{
                        model: Department,
                        as: 'department'
                    }, {
                        model: Bank,
                        as: 'bank'
                    }],
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'kadPengenalan',
                        'jawatan',
                        'noAkaun',
                        'phone',
                    ],
                    where: {
                        isActive: true
                    },
                    required: true
                }
            })
            return res.status(200).json({ message: 'Successfully retrieved approval list!', data: claims })
        } else {
            return res.status(401).json({ message: 'Unauthorized! ' });
        }
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const approveClaim = async (req, res) => {
    try {
        const { id, role, namaPertama, namaTerakhir } = decodeToken(req);

        const { claimId, approved, ulasan } = req.body;

        let claim = await Claim.findOne({
            where: {
                id: claimId,
            },
            include: {
                model: User,
                as: 'user'
            }
        })

        if (!claim) {
            return res.status(404).json({ message: 'Tuntutan tidak dijumpai!' });
        }

        if (role.name == 'SETIAUSAHA') {
            claim.setiausahaApproverId = id;
            claim.isSetiausahaApproved = approved;
            claim.setiausahaRemarks = ulasan ? ulasan : null;
            claim.setiausahaApprovedAt = new Date();
            claim.save();
            sendUpdateForClaim({
                namaPertama: claim.user.namaPertama,
                referenceNo: claim.referenceNo,
                approved: approved ? '<b>DILULUSKAN</b>' : '<b>TIDAK DILULUSKAN</b>',
                approverName: namaPertama,
                email: claim.user.email
            })
            notifyApprovalClaim(claim.user.id, approved ? 'Diluluskan' : 'Tidak Diluluskan')

            if (approved) {
                notifySubmittedClaim(claim.user.namaPertama + ' ' + claim.user.namaTerakhir, 'AKAUNTAN');
                sendClaimRequireApproval({
                    referenceNo: claim.referenceNo,
                    amaun: claim.amount,
                }, 'AKAUNTAN')
            }
            return res.status(200).json({ message: 'Successfully sent approval' })
        } else if (role.name == 'ADMIN 1') {
            claim.isAdmin1Approved = approved;
            claim.admin1ApproverId = id;
            claim.admin1Remarks = ulasan ? ulasan : null;
            claim.admin1ApprovedAt = new Date();
            claim.save();
            sendUpdateForClaim({
                namaPertama: claim.user.namaPertama,
                referenceNo: claim.referenceNo,
                approved: approved ? '<b>DISAHKAN</b>' : '<b>TIDAK DISAHKAN</b>',
                approverName: namaPertama,
                email: claim.user.email
            })
            notifyApprovalClaim(claim.user.id, approved ? 'Disahkan' : 'Tidak Disahkan')

            if (approved) {
                notifySubmittedClaim(claim.user.namaPertama + ' ' + claim.user.namaTerakhir, 'ADMIN 2');
                sendClaimRequireApproval({
                    referenceNo: claim.referenceNo,
                    amaun: claim.amount,
                }, 'ADMIN 2')
            }

            return res.status(200).json({ message: 'Successfully sent approval' })
        } else if (role.name == 'ADMIN 2') {
            claim.isAdmin2Approved = approved;
            claim.admin2ApproverId = id;
            claim.admin2Remarks = ulasan ? ulasan : null;
            claim.admin2ApprovedAt = new Date();
            claim.save();
            sendUpdateForClaim({
                namaPertama: claim.user.namaPertama,
                referenceNo: claim.referenceNo,
                approved: approved ? '<b>DISOKONG</b>' : '<b>TIDAK DISOKONG</b>',
                approverName: namaPertama,
                email: claim.user.email
            })

            notifyApprovalClaim(claim.user.id, approved ? 'Disokong' : 'Tidak Disokong')
            if (approved) {
                notifySubmittedClaim(claim.user.namaPertama + ' ' + claim.user.namaTerakhir, 'SETIAUSAHA');
                sendClaimRequireApproval({
                    referenceNo: claim.referenceNo,
                    amaun: claim.amount,
                }, 'SETIAUSAHA')
            }

            return res.status(200).json({ message: 'Successfully sent approval' })
        } else {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getPendingPayment = async (req, res) => {
    try {
        const { role } = decodeToken(req);

        if (role.name == 'AKAUNTAN') {
            let claims = await Claim.findAll({
                where: {
                    isAdmin1Approved: true,
                    isAdmin2Approved: true,
                    isSetiausahaApproved: true,
                    isAmountImbursed: null,
                },
                include: {
                    model: User,
                    as: 'user',
                    include: {
                        model: Bank,
                        as: 'bank'
                    },
                    attributes: [
                        'id',
                        'namaPertama',
                        'namaTerakhir',
                        'kadPengenalan',
                        'jawatan',
                        'noAkaun',
                        'phone',
                    ]
                }
            })
            return res.status(200).json({ message: 'Claims found!', data: claims || [] })
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const processPayment = async (req, res) => {
    try {
        const { role, id, namaPertama } = decodeToken(req);
        const { claimId, amaun, userId } = req.body;
        const file = req.files.file[0];

        if (role.name == 'AKAUNTAN') {
            const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

            const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_PAYMENT_CONTAINER_NAME);

            const blobName = `${new Date().getTime()}_${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(file.buffer, file.size);

            await UserClaim.update(
                {
                    akauntanApproverId: id,
                    bakiPeruntukan: sequelize.literal(`"bakiPeruntukan" - ${amaun}`)
                },
                {
                    where: {
                        userId,
                        year: moment().format('YYYY'),
                    }
                })
            let claim = await Claim.findOne({
                where: {
                    id: claimId,
                },
                include: {
                    model: User,
                    as: 'user',
                }
            })
            claim.isAmountImbursed = true
            claim.amountImbursedAt = new Date()
            claim.paymentReceipt = blobName

            claim.save();
            //
            notifyApprovalClaim(claim.user.id, 'Dibayar')
            sendPaymentMadeMail({
                namaPertama: claim.user.namaPertama,
                referenceNo: claim.referenceNo,
                approverName: namaPertama,
                email: claim.user.email,
                amaunBayaran: claim.amount,
            })
            return res.status(200).json({ message: 'Successfully updated claim status!' });
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getClaimHistory = async (req, res) => {
    try {
        let { role } = decodeToken(req);

        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            return Claim.findAll({
                include: {
                    model: User,
                    as: 'user',
                }
            })
        }
        return res.status(401).json({ message: 'Unauthorized!' })

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getClaimsByDepartment = async (req, res) => {
    try {
        let { role } = decodeToken(req);

        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let data = []
            let claimsByDepartments = await Department.findAll({
                include: {
                    model: User,
                    as: "users",
                    include: {
                        model: Claim,
                        as: "claims"
                    }
                }
            })
            let jumlahPeruntukan = 0;
            for (let i of claimsByDepartments) {
                let claimsCount = 0;
                i.users.forEach(e => {
                    claimsCount += e.claims.length
                    jumlahPeruntukan += 704;
                })
                data.push({
                    name: i.name,
                    count: claimsCount
                })
            }
            return res.status(200).json({ message: 'Success!', data, jumlahPeruntukan })
        }
        return res.status(401).json({ message: 'Unauthorized!' })

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getClaimBalanceByDept = async () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            Department.findAll(),
            UserClaim.findAll(
                {
                    where: {
                        year: moment().format('YYYY')
                    },
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: Department, as: 'department'
                        }
                    }
                })
        ])
            .then(results => {
                let data = []
                console.log(results);
                let departments = results[0];
                let userClaims = results[1];
                let deptObj = {};
                let bakiKeseluruhan = 0;
                let jumlahPeruntukanKeseluruhan = 0;
                for (let userClaim of userClaims) {
                    jumlahPeruntukanKeseluruhan += Number(userClaim.jumlahPeruntukan);
                    bakiKeseluruhan += Number(userClaim.bakiPeruntukan);
                    let departmentName = userClaim.user.department.name;
                    if (deptObj.hasOwnProperty(departmentName)) {
                        deptObj[departmentName] += Number(userClaim.bakiPeruntukan)
                    } else {
                        deptObj[departmentName] = Number(userClaim.bakiPeruntukan);
                    }
                }
                for (let department of departments) {
                    data.push({
                        department_name: department.name,
                        balance: deptObj[department.name] ? deptObj[department.name] : 0
                    })
                }
                data.sort((prev, next) => prev.balance - next.balance);
                resolve({
                    data,
                    jumlahPeruntukanKeseluruhan,
                    bakiKeseluruhan
                })
            }).catch(e => reject(e))
    })
}

const getBalanceByDepartment = async (req, res) => {
    try {
        let { role } = decodeToken(req, res);
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let { data, bakiKeseluruhan, jumlahPeruntukanKeseluruhan } = await getClaimBalanceByDept();
            return res.status(200).json({ message: 'Successful!', data, bakiKeseluruhan, jumlahPeruntukanKeseluruhan })
        }
        return res.status(401).json({ message: 'Unauthorized!' })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getRecentClaims = async (req, res) => {
    try {
        let { role } = decodeToken(req, res);
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let claims = await Claim.findAll({
                attributes: [
                    'amount',
                    'createdAt',
                    [sequelize.literal(`CASE WHEN "isAdmin1Approved" is null THEN 'Pending'
                    WHEN "isAdmin1Approved" = false THEN 'Rejected'
                    WHEN "isAdmin2Approved" is null THEN 'Pending'
                    WHEN "isAdmin2Approved" = false THEN 'Rejected'
                    WHEN "isSetiausahaApproved" is null THEN 'Pending'
                    WHEN "isSetiausahaApproved" = false THEN 'Rejected'
                    WHEN "isAmountImbursed" is null THEN 'Pending'
                    ELSE 'Completed' 
                    END`), 'status'],
                ],
                include: {
                    model: User,
                    as: 'user',
                    attributes: [
                        'avatar',
                        'namaPertama',
                        'jawatan'
                    ],
                    include: {
                        model: Department,
                        as: "department",
                        attributes: [
                            'name'
                        ]
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                limit: 5,
            })

            for (let claim of claims) {
                claim.createdAt = moment(claim.createdAt).format('DD MMM YYYY');
                if (claim.dataValues.user.avatar) {
                    const cerds = new StorageSharedKeyCredential(process.env.AZURE_BLOB_ACCOUNT, process.env.AZURE_BLOB_SAS_KEY);

                    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)
                    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_USER_AVATAR_CONTAINER_NAME);

                    const blobName = claim.dataValues.user.avatar;


                    const blobClient = containerClient.getBlobClient(blobName);

                    const blobSAS = generateBlobSASQueryParameters({
                        containerName: process.env.AZURE_BLOB_USER_AVATAR_CONTAINER_NAME,
                        blobName,
                        permissions: BlobSASPermissions.parse("racwd"),
                        startsOn: new Date(),
                        expiresOn: new Date(new Date().valueOf() + 86400)
                    }, cerds
                    ).toString();

                    claim.user.avatar = blobClient.url + "?" + blobSAS;
                }
            }
            return res.status(200).json({ message: 'Success!', data: claims });
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getAllClaims = async (req, res) => {
    try {
        let { role } = decodeToken(req);
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let claims = await Claim.findAll({
                include: [{
                    model: User,
                    as: 'user',
                    include: {
                        model: Department,
                        as: 'department'
                    },
                    attributes: [
                        'id',
                    ]
                }]
            });
            return res.status(200).json({ message: 'Successful!', claims })
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getAmountImbursed = async (req, res) => {
    try {
        let { role } = decodeToken(req);
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let userClaims = await UserClaim.findAll({ where: { year: moment().format('YYYY') } });
            let jumlahPeruntukan = 0;

            userClaims.forEach(e => jumlahPeruntukan += Number(e.jumlahPeruntukan));
            userClaims.forEach(e => jumlahPeruntukan -= Number(e.bakiPeruntukan));
            return res.status(200).json({ message: 'Successful!', jumlahPeruntukan })
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    submit,
    getBalance,
    getClaimHistoryByUserId,
    getMonthlyClaimsByUserId,
    getApprovalList,
    approveClaim,
    getPendingPayment,
    processPayment,
    getClaimHistory,
    getClaimsByUserId,
    getRecentClaims,
    getClaimsByDepartment,
    getBalanceByDepartment,
    getAllClaims,
    getAmountImbursed,
    submitPastClaim
}