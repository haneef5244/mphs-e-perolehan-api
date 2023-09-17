const { decodeToken } = require("../helper/authDecode");
const { User, Jabatan, KodBidang } = require("../models");
const KodBidangTender = require("../models/kodBidangTender");
const NegeriDaerahSyarikatTender = require("../models/negeriDaerahSyarikatTender");
const PegawaiTender = require("../models/pegawaiTender");
const Tender = require("../models/tender");
const { submitPegawaiTender, submitKodBidangTender, submitSyarikatDaerahTender, submitTenderRelatedDetails } = require("../service/tenderService");
const { upload } = require("../service/upload");

const submitTender = async (req, res) => {
    try {
        const {
            jenis,
            noRujukan,
            tajuk,
            hargaDokumen,
            pegawaiBertanggungjawab,
            syaratTender,
            syaratKhas,
            isBumiputeraSahaja,
            isSyarikatSelangorSahaja,
            isSyarikatSelangorDanLainLainNegeriSahaja,
            syarikatNegeriDaerah,
            isTenderTerhad,
            isIklanSahaja,
            isPenjualanManual,
            kodBidang,
            jabatan,
            tarikhIklanMula,
            tarikhIklanAkhir,
            tarikhJualMula,
            tarikhJualAkhir,
            tarikhTutupMula,
            tarikhTutupAkhir,
            alamatSerahan,
            alamatTaklimat,
            lawatanTapak,
        } = req.body;
        let user = decodeToken(req);

        const parsedPegawaiBertanggungjawab = pegawaiBertanggungjawab ? JSON.parse(pegawaiBertanggungjawab) : [];
        const parsedKodBidang = kodBidang ? JSON.parse(kodBidang) : [];
        const parsedSyarikatNegeriDaerah = syarikatNegeriDaerah ? JSON.parse(syarikatNegeriDaerah) : [];
        const dokumenTender = req.files.dokumenTender[0];
        let dokumenTenderBlobName = await upload(dokumenTender.originalname, dokumenTender.buffer, dokumenTender.size, process.env.AZURE_BLOB_DOKUMEN_TENDER_CONTAINER);

        let tender = await Tender.create({
            jenis,
            noRujukan,
            tajuk,
            hargaDokumen,
            syaratTender,
            syaratKhas,
            isBumiputeraSahaja,
            dokumenTender: dokumenTenderBlobName,
            isSyarikatSelangorSahaja,
            isSyarikatSelangorDanLainLainNegeriSahaja,
            isTenderTerhad,
            isIklanSahaja,
            isPenjualanManual,
            //kodBidang,
            jabatanId: jabatan,
            tarikhIklanMula,
            tarikhIklanAkhir,
            tarikhJualMula,
            tarikhJualAkhir,
            tarikhTutupMula,
            tarikhTutupAkhir,
            alamatSerahan,
            alamatTaklimat,
            lawatanTapak,
            createdBy: user.id,
            lastUpdatedBy: user.id
        })

        await submitTenderRelatedDetails({ parsedKodBidang, parsedPegawaiBertanggungjawab, parsedSyarikatNegeriDaerah }, tender);
        res.status(201).json({ message: 'Tender berjaya dicipta!' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getPendingApprovalTenders = async (req, res) => {
    const tenders = await Tender.findAll({
        where: {
            isApproved: null
        }
    })
    res.status(200).json({ data: tenders });
}

const getTenders = async (req, res) => {
    const tenders = await Tender.findAll({
        include: [{
            model: PegawaiTender,
            as: 'pegawaiTender',
            include: {
                model: User,
                as: 'user',
                attributes: [
                    'namaPertama',
                    'namaTerakhir',
                    'kadPengenalan',
                    'jawatan'
                ],
                include: {
                    model: Jabatan,
                    as: 'jabatan',
                    attributes: [
                        'nama'
                    ]
                }
            }
        }, {
            model: KodBidangTender,
            as: 'kodBidang',
            include: {
                model: KodBidang,
                as: 'kodBidang'
            }
        }, {
            model: NegeriDaerahSyarikatTender,
            as: 'negeriDaerahSyarikat'
        }, {
            model: Jabatan,
            as: 'jabatan'
        }]
    });
    res.status(200).json({ data: tenders });
}

const approveTender = async (req, res) => {
    try {
        const { isApproved, id } = req.body;

        let user = decodeToken(req);

        await Tender.update({
            isApproved: isApproved,
            approvedDate: new Date(),
            approvalBy: user.id,
            lastUpdatedBy: user.id,
        },
            {
                where: {
                    id
                }
            })
        res.status(200).json({ message: 'Successfully updated!' });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    submitTender,
    getPendingApprovalTenders,
    getTenders,
    approveTender
}