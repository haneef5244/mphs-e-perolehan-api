const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const KodBidang = sequelize.define('kodBidang', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    kod: DataTypes.STRING,
    maklumat: DataTypes.STRING,
}, {
    freezeTableName: true
})

module.exports = KodBidang;