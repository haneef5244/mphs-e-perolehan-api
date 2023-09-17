const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const NegeriDaerahSyarikatTender = sequelize.define('negeriDaerahSyarikatTender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    negeri: DataTypes.STRING,
    daerah: DataTypes.STRING,
}, {
    freezeTableName: true
})

module.exports = NegeriDaerahSyarikatTender;