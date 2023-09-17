const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const KodBidangTender = sequelize.define('kodBidangTender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
}, {
    freezeTableName: true
})

module.exports = KodBidangTender;