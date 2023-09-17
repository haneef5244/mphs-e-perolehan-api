const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const UserRole = sequelize.define('userRole', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }
})

module.exports = UserRole;