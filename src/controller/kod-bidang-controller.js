const { KodBidang } = require("../models");

const getKodBidang = async (req, res) => {
    try {
        let kodBidang = await KodBidang.findAll();
        return res.status(200).json({ message: 'Successfully retrieved kod-kod bidang!', data: kodBidang });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    getKodBidang,
}