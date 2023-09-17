const { Jabatan } = require("../models");

const getDepartments = async (req, res) => {
    try {
        let departments = await Jabatan.findAll();
        if (!departments) departments = [];
        return res.status(200).json({ message: 'Successfully retrieved departments!', data: departments });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    getDepartments,
}