const KodBidangTender = require("../models/kodBidangTender")
const NegeriDaerahSyarikatTender = require("../models/negeriDaerahSyarikatTender")
const PegawaiTender = require("../models/pegawaiTender")

const submitPegawaiTender = async (pegawaiBertanggungjawab, tenderId) => {
    return pegawaiBertanggungjawab.map(async pegawai => await PegawaiTender.create({
        tenderId,
        userId: pegawai.id
    }))
}

const submitSyarikatDaerahTender = async (syarikatNegeriDaerah, tenderId) => {
    return syarikatNegeriDaerah.map(async syarikatNegeri => await NegeriDaerahSyarikatTender.create({
        tenderId,
        negeri: syarikatNegeri.negeri,
        daerah: syarikatNegeri.daerah,
    }))
}

const submitKodBidangTender = async (kodBidang, tenderId) => {
    return kodBidang.map(async kod => await KodBidangTender.create({
        tenderId,
        kodBidangId: kod.id,
    }))
}

const submitTenderRelatedDetails = async (props, tender) => {
    return new Promise((resolve, reject) => {
        const { parsedPegawaiBertanggungjawab, parsedSyarikatNegeriDaerah, parsedKodBidang } = props;
        Promise.all([
            submitPegawaiTender(parsedPegawaiBertanggungjawab, tender.id),
            submitSyarikatDaerahTender(parsedSyarikatNegeriDaerah, tender.id),
            submitKodBidangTender(parsedKodBidang, tender.id)
        ]).then(res => {
            resolve(res);
        }).catch(e => {
            reject(e)
        });
    })
}

module.exports = {
    submitPegawaiTender,
    submitSyarikatDaerahTender,
    submitKodBidangTender,
    submitTenderRelatedDetails
}