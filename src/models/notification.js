const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Notification = sequelize.define('notification', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
})

module.exports = Notification;