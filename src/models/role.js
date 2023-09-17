const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Role = sequelize.define('role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING
})

module.exports = Role;