const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Page = sequelize.define('Page', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING
})

module.exports = Page;