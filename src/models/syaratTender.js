const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const SyaratTender = sequelize.define('syaratTender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    // store in base64 to save formatting
    maklumat: DataTypes.STRING,
    isSyaratKhas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    freezeTableName: true
})

module.exports = SyaratTender;