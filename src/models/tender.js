const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db');

const Tender = sequelize.define('tender', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    jenis: {
        type: DataTypes.ENUM('TENDER', 'SEBUT HARGA', 'PERUNDING', 'PEMBELIAN TERUS (P.O.)'),
    },
    noRujukan: DataTypes.STRING,
    tajuk: DataTypes.STRING,
    hargaDokumen: DataTypes.DOUBLE,
    syaratTender: DataTypes.STRING,
    syaratKhas: DataTypes.STRING,
    lawatanTapak: DataTypes.STRING,
    dokumenTender: DataTypes.STRING,
    isBumiputeraSahaja: DataTypes.BOOLEAN,
    isSyarikatSelangorSahaja: DataTypes.BOOLEAN,
    isSyarikatSelangorDanLainLainNegeriSahaja: DataTypes.BOOLEAN,
    isTenderTerhad: DataTypes.BOOLEAN,
    isIklanSahaja: DataTypes.BOOLEAN,
    isPenjualanManual: DataTypes.BOOLEAN,
    tarikhIklanMula: DataTypes.DATE,
    tarikhIklanAkhir: DataTypes.DATE,
    tarikhJualMula: DataTypes.DATE,
    tarikhJualAkhir: DataTypes.DATE,
    alamatSerahan: DataTypes.STRING,
    alamatTaklimat: DataTypes.STRING,
    tarikhTaklimat: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    lastUpdatedAt: DataTypes.DATE,
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
    },
    approvedDate: DataTypes.DATE,
})

module.exports = Tender;