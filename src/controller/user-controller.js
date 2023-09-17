const User = require('../models/user');
const Role = require('../models/role');
const Page = require('../models/page');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Jabatan, UserRole } = require('../models');
const { decodeToken, decodeGeneralToken, auth } = require('../helper/authDecode');
const sequelize = require('sequelize');
const { v4: uuidv4, } = require('uuid');
const { sendRegistrationVerificationMail, sendResetPasswordEmail } = require('../service/emailService');
const moment = require('moment');
const { uploadProfilePicture } = require('../service/upload');
const azure = require('azure-storage');
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions, StorageSharedKeyCredential } = require('@azure/storage-blob');

uuidv4();

const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const { notifyAccountRegistered } = require('../service/notificationService');
const Notification = require('../models/notification');
const e = require('express');

const login = async (req, res) => {
    try {
        const { kadPengenalan, password } = req.body;
        const existingUser = await User.findOne({
            where: { kadPengenalan, isActive: true },
            include: [{
                model: Role,
                as: "role"
            }]
        })

        if (existingUser && await bcrypt.compare(password, existingUser.dataValues.password)) {
            if (!existingUser.isVerified) {
                return res.status(500).json({ message: 'Akaun anda belum disahkan. Sila sahkan melalui email anda!' });
            }
            if (existingUser.role.length) {
                const token = jwt.sign({
                    id: existingUser.dataValues.id,
                    kadPengenalan: kadPengenalan,
                    email: existingUser.dataValues.email,
                    role: existingUser.role.map(e => ({
                        id: e.dataValues.id,
                        name: e.dataValues.name
                    })),
                    namaPertama: existingUser.dataValues.namaPertama,
                    namaTerakhir: existingUser.dataValues.namaTerakhir,
                },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h'
                    })
                console.log(`token = ${token}`)
                existingUser.token = token;
                existingUser.save();
                return res.status(200).json({
                    message: "Successfully logged in!",
                    data: {
                        token
                    }
                });
            } else {
                return res.status(400).json({ message: 'Role akaun anda masih belum di set. Sila hubungi Admin untuk set role akaun anda.' })
            }
        }
        return res.status(404).json({ message: 'Kad pengenalan atau password anda tidak dapat dikenal pasti.' })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const autoCapitalize = (val) => {
    const arr = val.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(" ");
}

const register = async (req, res) => {
    try {
        let { namaPertama, namaTerakhir, email, kadPengenalan, alamat1, alamat2, poskod, bandar, negeri, password, jabatan, jawatan, phone } = req.body;

        namaPertama = autoCapitalize(namaPertama.toLowerCase().trim());
        namaTerakhir = autoCapitalize(namaTerakhir.toLowerCase().trim());
        jawatan = autoCapitalize(jawatan.toLowerCase().trim());
        alamat1 = autoCapitalize(alamat1.toLowerCase().trim());
        alamat2 = alamat2 ? autoCapitalize(alamat2.toLowerCase().trim()) : alamat2;
        email = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            where: {
                [sequelize.Op.or]: [
                    {
                        email:
                        {
                            [sequelize.Op.eq]: email
                        }
                    },
                    {
                        kadPengenalan:
                        {
                            [sequelize.Op.eq]: kadPengenalan
                        }
                    }
                ],
                isActive: true
            }
        })

        if (existingUser) {
            return res.status(400).json({ message: 'Email atau kad pengenalan sudah digunapakai.' })
        }

        let encryptedPassword = await bcrypt.hash(password, 10)

        let userId = uuidv4();

        const verificationId = jwt.sign({
            id: userId,
        },
            process.env.TOKEN_KEY,
            {
                expiresIn: '48h'
            })

        let user = await User.create({
            id: userId,
            namaPertama,
            namaTerakhir,
            email,
            kadPengenalan,
            alamat1,
            alamat2,
            poskod,
            bandar,
            negeri,
            password: encryptedPassword,
            jabatanId: jabatan,
            jawatan,
            phone,
            verificationId
        });

        let role = await Role.findOne({
            where: {
                name: 'STAF'
            }
        });

        await UserRole.create({
            userId: user.id,
            roleId: role.id
        })

        sendRegistrationVerificationMail({ namaPertama, email, verificationId })

        return res.status(201).json({ message: `Email verifikasi telah dihantar pada ${email}. Sila sahkan email anda.` });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getMe = (req, res) => {
    try {
        return res.status(201).json({ message: 'Successfully retrieve user details.', ...decodeToken(req) });
    } catch (e) {
        return res.status(e.status).json({ message: e.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const { role } = decodeToken(req);

        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {

            let users = await User.findAll({
                include: [{
                    model: Jabatan,
                    as: 'jabatan',
                }, {
                    model: Role,
                    as: 'role',
                }],
                attributes: [
                    'id',
                    'namaPertama',
                    'namaTerakhir',
                    'kadPengenalan',
                    'createdAt',
                    'email',
                    'jawatan',
                    ['phone', 'telefon'],
                ],
                where: {
                    isActive: true
                }
            });
            return res.status(200).json({ message: 'Successfully retrieved users!', data: users });

        }
        return res.status(401).json({ message: 'Unauthorized' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}


const getUsersInfo = async (req, res) => {
    try {
        const { role } = decodeToken(req);
        const { nama, kadPengenalan, page, sortBy, order } = req.query;

        let userClaimsQuery = {
            model: User,
            as: 'user',
            include: [{
                model: Jabatan,
                as: 'jabatan',
            },
            {
                model: Bank,
                as: 'bank'
            },
            {
                model: Claim,
                as: 'claims',
                include: [{
                    model: User,
                    as: 'admin1Approver',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir'
                    ]
                }, {
                    model: User,
                    as: 'admin2Approver',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir',
                        'jawatan'
                    ]
                }, {
                    model: User,
                    as: 'setiausahaApprover',
                    attributes: [
                        'namaPertama',
                        'namaTerakhir'
                    ]
                }]
            }],
            attributes: [
                'id',
                'namaPertama',
                'namaTerakhir',
                'kadPengenalan',
                'createdAt',
                'email',
                'jawatan',
                'phone',
                'isActive',
                'jabatanId',
                'avatar',
                'noAkaun',
                [sequelize.literal("'namaPertama' || ' ' || 'namaTerakhir'"), 'nama']
            ],
        }
        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            if (nama) {
                userClaimsQuery.where = {
                    [sequelize.Op.or]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('namaPertama')), { [sequelize.Op.like]: `%${nama.toLowerCase()}%` }),
                        sequelize.where(sequelize.fn('lower', sequelize.col('namaTerakhir')), { [sequelize.Op.like]: `%${nama.toLowerCase()}%` }),
                    ]
                }

            } else if (kadPengenalan) {
                userClaimsQuery.where = {
                    kadPengenalan: {
                        [sequelize.Op.like]: `%${kadPengenalan}%`
                    }
                }
            }
            let resp = await userInfoQueries(userClaimsQuery, page, sortBy, order)
            return res.status(200).json({ data: resp.data, count: resp.count })
        }
        return res.status(401).json({ message: 'Unauthorized' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }


}

const getProfile = async (req, res) => {
    try {
        return new Promise(async (resolve, reject) => {
            let decoded = decodeToken(req);

            let { id } = decoded;

            let claimsQuery = new Promise((resolve, reject) => {
                resolve(Claim.findAll({
                    where: { userId: id }
                }))
            })

            let userQuery = new Promise((resolve, reject) => {
                resolve(User.findOne({
                    where: { id },
                    include: [
                        {
                            model: Jabatan,
                            as: 'jabatan'
                        },
                    ]
                }))
            })

            let avatar = null
            Promise.all([claimsQuery, userQuery]).then(results => {
                let claims = results[0];
                let user = results[1];

                let numberOfClaims = claims.length;
                let rejectedClaims = claims.filter(e => e.isAdmin1Approved == false || e.isAdmin2Approved == false || e.isSetiausahaApproved == false).length;
                let approvedClaims = claims.filter(e => e.isSetiausahaApproved).length;

                if (user.dataValues.avatar) {
                    const cerds = new StorageSharedKeyCredential(process.env.AZURE_BLOB_ACCOUNT, process.env.AZURE_BLOB_SAS_KEY);

                    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)
                    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_USER_AVATAR_CONTAINER_NAME);

                    const blobName = user.dataValues.avatar;


                    const blobClient = containerClient.getBlobClient(blobName);

                    const blobSAS = generateBlobSASQueryParameters({
                        containerName: process.env.AZURE_BLOB_USER_AVATAR_CONTAINER_NAME,
                        blobName,
                        permissions: BlobSASPermissions.parse("racwd"),
                        startsOn: new Date(),
                        expiresOn: new Date(new Date().valueOf() + 86400)
                    }, cerds
                    ).toString();

                    avatar = blobClient.url + "?" + blobSAS;

                }

                return res.status(200).json({
                    message: 'Successfully retrieved user profile!',
                    data: {
                        numberOfClaims,
                        rejectedClaims,
                        approvedClaims,
                        jawatan: user.dataValues.jawatan,
                        jabatan: user.dataValues.department.name,
                        namaPertama: user.dataValues.namaPertama,
                        namaTerakhir: user.dataValues.namaTerakhir,
                        telefon: user.dataValues.phone,
                        email: user.dataValues.email,
                        kadPengenalan: user.dataValues.kadPengenalan,
                        alamat1: user.dataValues.alamat1,
                        alamat2: user.dataValues.alamat2,
                        bandar: user.dataValues.bandar,
                        negeri: user.dataValues.negeri,
                        noAkaun: user.dataValues.noAkaun,
                        bank: user.dataValues.bank,
                        avatar
                    }
                })
            }).catch(e => {
                return res.status(500).json({
                    message: e.message
                })
            })
        })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getUsersPendingRoleAssignment = async (req, res) => {
    try {
        const { role } = decodeToken(req);

        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let users = await User.findAll({
                where: {
                    isActive: true
                }
            });
            return res.status(200).json({ message: 'Users pending role assignment retrieved!', data: users })
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const updateUserRole = async (req, res) => {
    try {
        const { role } = decodeToken(req);
        const { userId, roleName } = req.body;
        if (role.name == 'ADMIN 1' || role.name == 'ADMIN 2' || role.name == 'SETIAUSAHA') {
            let role = await Role.findOne({
                where: {
                    name: roleName
                }
            })
            await UserRole.create({
                userId,
                roleId: role.id
            })
            return res.status(200).json({ message: 'Successfully updated!' });
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getUserCountByDepartment = async (req, res) => {
    try {
        const { role } = decodeToken(req);

        if (['ADMIN 1', 'ADMIN 2', 'SETIAUSAHA'].includes(role.name)) {
            let departments = await Department.findAll({
                include: {
                    model: User,
                    as: 'users',
                    attributes: [
                        'id',
                    ],
                    where: {
                        isActive: true
                    }
                }
            });
            return res.status(200).json({ message: 'Successfully retrived!', data: departments })
        }
        return res.status(401).json({ message: 'Unauthorized!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, role } = decodeToken(req);

        let { namaPertama, namaTerakhir, email, telefon, alamat1, noAkaun, bankId,
            kadPengenalan, alamat2, poskod, bandar, negeri, jawatan, departmentId,
            roleId, userId } = req.body;
        email = email.trim();
        let updateObj = {}

        let userIdTobeUpdated = userId ? userId : id;

        if (namaPertama) {
            Object.assign(updateObj, { namaPertama })
        }
        if (namaTerakhir) {
            Object.assign(updateObj, { namaTerakhir })
        }
        if (email) {
            let emailUser = await User.findOne({
                where: {
                    email: email,
                }
            })
            if (emailUser && emailUser.id != userIdTobeUpdated) {
                return res.status(500).json({ message: 'Email sudah digunapakai!' })
            }
            Object.assign(updateObj, { email })
        }
        if (telefon) {
            Object.assign(updateObj, { phone: telefon })
        }
        if (noAkaun) {
            Object.assign(updateObj, { noAkaun })
        }
        if (bankId) {
            Object.assign(updateObj, { bankId })
        }
        if (kadPengenalan) {
            let kadPengenalanUser = await User.findOne({
                where: {
                    kadPengenalan: kadPengenalan,
                }
            })
            if (kadPengenalanUser && kadPengenalanUser.id != userIdTobeUpdated) {
                return res.status(500).json({ message: 'Kad Pengenalan sudah digunapakai!' })
            }
            Object.assign(updateObj, { kadPengenalan })
        }
        if (alamat1) {
            Object.assign(updateObj, { alamat1 })
        }
        if (alamat2) {
            Object.assign(updateObj, { alamat2 })
        }
        if (poskod) {
            Object.assign(updateObj, { poskod })
        }
        if (bandar) {
            Object.assign(updateObj, { bandar })
        }
        if (negeri) {
            Object.assign(updateObj, { negeri })
        }
        if (jawatan) {
            Object.assign(updateObj, { jawatan })
        }
        if (departmentId) {
            Object.assign(updateObj, { departmentId })
        }
        if (userId && role.name == 'ADMIN 1') {
            await User.update(updateObj, {
                where: { id: userId }
            })
            let userRole = await UserRole.findOne({
                where: {
                    userId
                }
            })
            if (!userRole) {
                await UserRole.create({
                    userId,
                    roleId,
                })
            } else {
                userRole.roleId = roleId;
                userRole.save();
            }
        } else {
            await User.update(updateObj, {
                where: { id }
            })
        }

        return res.status(200).json({ message: 'Profile anda berjaya dikemas kini!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const verify = async (req, res) => {
    try {

        decodeGeneralToken(req.params.id);
        let user = await User.findOne({
            where: {
                verificationId: req.params.id
            }
        });
        if (user && !user.isVerified) {
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: 'Akaun anda telah disahkan!' })
        }
        return res.status(404).json({ message: 'Akaun anda telah disahkan!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const updateUserProfilePicture = async (req, res) => {
    try {
        let { id } = decodeToken(req);

        const picture = req.files.profilePicture[0];

        let blobName = await uploadProfilePicture(picture.originalname, picture.buffer, picture.size)

        await User.update({
            avatar: blobName
        }, {
            where: {
                id
            }
        })

        return res.status(200).json({ message: 'Successfully updated avatar!' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const getWsToken = async (req, res) => {
    try {
        let { id } = decodeToken(req);

        const hub = "users";
        let service = new WebPubSubServiceClient(process.env.AZURE_WEB_PUB_SUB_CONNECTION_STRING, hub);
        let token = await service.getClientAccessToken();
        return res.status(200).json({ message: 'Successful!', data: { tokenUrl: token.url } })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

}

const getNotificationWsToken = async (req, res) => {
    try {
        let { id } = decodeToken(req);

        const hub = "notifications";

        let service = new WebPubSubServiceClient(process.env.AZURE_WEB_PUB_SUB_CONNECTION_STRING, hub);
        let token = await service.getClientAccessToken({ userId: id });
        return res.status(200).json({ message: 'Successful!', data: { tokenUrl: token.url } })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const readNotification = async (req, res) => {
    try {
        let { id } = decodeToken(req);
        await Notification.update(
            {
                isRead: true
            },
            {
                where: {
                    notificationUserId: id,
                    id: req.body.notificationId
                }
            }
        )
        return res.status(200).json({ message: 'Successful' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

const getNotifications = async (req, res) => {
    try {
        let { id } = decodeToken(req);
        let notifications = await Notification.findAll({
            where: {
                notificationUserId: id,
                isRead: false
            },
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        return res.status(200).json({ message: 'Successfully retrieved!', data: notifications })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        let { id, role } = decodeToken(req);
        let { userId } = req.body;
        if (role.name !== 'ADMIN 1') {
            return res.status(401).json({ message: 'Unauthorized!' })
        }
        await User.update(
            {
                isActive: false,
                isDeactivatedAt: new Date(),
                isDeactivatedBy: id
            },
            {
                where: { id: userId }
            }
        )
        return res.status(200).json({ message: 'User telah dinyahaktifkan!' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const activateUser = async (req, res) => {
    try {
        let { id, role } = decodeToken(req);
        let { userId } = req.body;
        if (role.name !== 'ADMIN 1') {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        await User.update(
            {
                isActive: true,
            },
            {
                where: { id: userId }
            }
        )
        return res.status(200).json({ message: 'User telah diaktifkan!' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const getUserById = async (req, res) => {
    try {
        let { role } = decodeToken(req);
        if (role.name !== 'ADMIN 1') {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        let userId = req.params.id;
        let user = await User.findOne({
            where: {
                id: userId,
            },
            include: [{
                model: Bank,
                as: 'bank'
            }, {
                model: Department,
                as: 'department'
            }, {
                model: Role,
                as: 'role'
            }],
            attributes: [
                'namaPertama',
                'namaTerakhir',
                'kadPengenalan',
                'noAkaun',
                'email',
                'phone',
                'alamat1',
                'alamat2',
                'poskod',
                'bandar',
                'negeri',
                'jawatan'
            ]
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        return res.status(200).json({ message: 'Successful!', data: user })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const getRoles = async (req, res) => {
    try {
        let { role } = decodeToken(req);
        if (role.name !== 'ADMIN 1' && role.name !== 'ADMIN 2' && role.name !== 'SETIAUSAHA' && role.name !== 'AKAUNTAN') {
            return res.status(401).json({ message: 'Unauthorized!' });
        }
        let roles = await Role.findAll();
        return res.status(200).json({ message: 'Successful!', data: roles })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const validateResetPassword = async (req, res, next) => {
    try {
        let { id } = req.params;
        jwt.verify(id, process.env.TOKEN_KEY);
        req.query.token = id;
        let decoded = decodeToken(req);

        let user = await User.findOne({
            where: {
                id: decoded.id,
                isActive: true,
                forgotPasswordToken: id
            },
            attributes: [
                'email',
                'kadPengenalan'
            ]
        })
        if (!user) {
            return res.status(404).json({ message: 'Akaun tidak dijumpai!' })
        }
        return res.status(200).json({ message: 'Successful!', data: user })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const resetPassword = async (req, res, next) => {
    try {
        let { id, password } = req.body;
        jwt.verify(id, process.env.TOKEN_KEY)
        req.query.token = id;
        let decoded = decodeToken(req);

        let user = await User.findOne({
            where: {
                id: decoded.id,
                isActive: true,
            }
        })
        let encryptedPassword = await bcrypt.hash(password, 10)
        user.forgotPasswordToken = null;
        user.password = encryptedPassword;
        await user.save();
        return res.status(200).json({ message: 'Katalaluan anda telah dikemaskini!' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const forgotPassword = async (req, res) => {
    try {
        let { kadPengenalan, email } = req.body;

        let user = await User.findOne({
            where: {
                isActive: true,
                kadPengenalan,
                email
            },
            attributes: [
                'email',
                'namaPertama',
                'namaTerakhir',
                'id',
                'kadPengenalan',
            ]
        })
        if (!user) {
            return res.status(404).json({ message: 'Akaun tidak dijumpai!' })
        }
        const forgotPasswordToken = jwt.sign(
            {
                id: user.id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '48h'
            }
        )
        // send email
        user.forgotPasswordToken = forgotPasswordToken
        await user.save();
        sendResetPasswordEmail({ nama: user.namaPertama.trim() + ' ' + user.namaTerakhir.trim(), email: user.email.trim(), forgotPasswordToken })

        return res.status(200).json({ message: 'Email untuk meneruskan ketetapan semula kata laluan anda telah dihantar pada email anda. Sila ikuti arahan dalam email tersebut.' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const getPegawai = async (req, res, next) => {
    try {
        let { role } = decodeToken(req);
        let filteredRole = role.map(e => e.name);
        if (!filteredRole.includes('STAF')
            && !filteredRole.includes('PEGAWAI')) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        let user = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
                where: {
                    name: 'PEGAWAI'
                },
                attributes: [
                    'id',
                    'name'
                ],
            }],
            attributes: [
                'id',
                'namaPertama',
                'namaTerakhir',
            ]
        })

        return res.status(200).json({ message: 'Successful!', data: user })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    login,
    register,
    getMe,
    getUsers,
    getProfile,
    getUsersPendingRoleAssignment,
    updateUserRole,
    getUserCountByDepartment,
    updateUser,
    verify,
    updateUserProfilePicture,
    getWsToken,
    getNotificationWsToken,
    getNotifications,
    readNotification,
    deleteUser,
    getUsersInfo,
    activateUser,
    getUserById,
    getRoles,
    forgotPassword,
    validateResetPassword,
    resetPassword,
    getPegawai
}