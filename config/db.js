
const Sequelize = require('sequelize');

const connection = new Sequelize(
    'mphs-e-perolehan', // db
    'postgres', // username
    'admin', // password
    {
        host: 'localhost',
        dialect: 'postgres',
        /* dialectOptions: {
            "ssl": {
                "require": false,
            }
        } */
    }
);

connection.authenticate();

const sequelize = connection;

const init = () => {
    const User = require('../src/models/user');
    const Role = require('../src/models/role');
    const UserRole = require('../src/models/userRole');
    const Notification = require('../src/models/notification');
    const Jabatan = require('../src/models/jabatan');

    const Tender = require('../src/models/tender');
    const KodBidangTender = require('../src/models/kodBidangTender');
    const KodBidang = require('../src/models/kodBidang');
    const SyaratTender = require('../src/models/syaratTender');
    const PegawaiTender = require('../src/models/pegawaiTender');
    const NegeriDaerahSyarikatTender = require('../src/models/negeriDaerahSyarikatTender');

    Tender.hasMany(PegawaiTender, {
        foreignKey: 'tenderId',
        as: 'pegawaiTender'
    })
    Tender.hasMany(KodBidangTender, {
        foreignKey: 'tenderId',
        as: 'kodBidang'
    })
    KodBidang.hasMany(KodBidangTender, {
        foreignKey: 'kodBidangId',
        as: 'kodBidangTender'
    })
    KodBidangTender.belongsTo(KodBidang, {
        foreignKey: 'kodBidangId',
        as: 'kodBidang'
    })
    User.hasMany(PegawaiTender, {
        foreignKey: 'userId',
        as: 'pegawaiTender'
    })
    PegawaiTender.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    })
    Tender.hasMany(NegeriDaerahSyarikatTender, {
        foreignKey: 'tenderId',
        as: 'negeriDaerahSyarikat'
    })
    Tender.belongsTo(User, {
        foreignKey: "approvalBy",
        as: "approvalByUser"
    })
    Tender.belongsTo(Jabatan, {
        foreignKey: "jabatanId",
        as: "jabatan"
    })
    Tender.belongsTo(User, {
        foreignKey: "createdBy",
        as: "createdByUser"
    })
    Tender.belongsTo(User, {
        foreignKey: "lastUpdatedBy",
        as: "lastUpdatedByUser"
    })
    User.belongsToMany(Role, {
        through: UserRole,
        foreignKey: 'userId',
        as: 'role'
    })
    Role.belongsToMany(User, {
        through: UserRole,
        foreignKey: 'roleId',
        as: 'user'
    })
    UserRole.hasMany(User, {
        foreignKey: 'userId',
        as: 'user'
    })
    User.hasMany(Notification, {
        foreignKey: "notificationUserId",
        as: "notificationUser"
    })

    User.Jabatan = User.belongsTo(Jabatan, {
        foreignKey: "jabatanId",
        as: "jabatan"
    })
    Jabatan.hasMany(User, {
        foreignKey: 'jabatanId',
        as: 'users'
    })
    Notification.belongsTo(User, {
        as: "notificationUser",
    })

}


module.exports = {
    sequelize,
    init
};