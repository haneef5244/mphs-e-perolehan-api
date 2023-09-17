const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Jabatan = sequelize.define('jabatan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama: DataTypes.STRING,
}, {
    freezeTableName: true
})

module.exports = Jabatan;