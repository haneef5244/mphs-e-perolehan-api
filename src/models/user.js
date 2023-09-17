const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    namaPertama: DataTypes.STRING,
    namaTerakhir: DataTypes.STRING,
    kadPengenalan: {
        type: DataTypes.STRING,
        allowNull: false,
        //primaryKey: true,
    },
    noAkaun: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        //primaryKey: true
    },
    phone: DataTypes.STRING,
    alamat1: DataTypes.STRING,
    alamat2: DataTypes.STRING,
    poskod: DataTypes.STRING,
    bandar: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    isDeactivatedAt: DataTypes.DATE,
    isDeactivatedBy: DataTypes.UUID,
    negeri: DataTypes.STRING,
    password: DataTypes.STRING,
    jawatan: DataTypes.STRING,
    avatar: DataTypes.STRING,
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verificationId: DataTypes.STRING(2048),
    token: DataTypes.STRING(2048),
    forgotPasswordToken: DataTypes.STRING(2048),
})

module.exports = User;