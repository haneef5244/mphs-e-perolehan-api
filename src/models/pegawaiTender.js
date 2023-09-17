const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const PegawaiTender = sequelize.define('pegawaiTender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
}, {
    freezeTableName: true
})

module.exports = PegawaiTender;