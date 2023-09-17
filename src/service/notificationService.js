const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const { CLAIM_SUBMITTED, CLAIM_APPROVAL, CLAIM_PENDING_PAYMENT, ACCOUNT_REGISTERED } = require('../constant/notificationType');
const Notification = require('../models/notification');
const Role = require('../models/role');
const User = require('../models/user');

const notifySubmittedClaim = async (nama, role) => {
    let admin1Users = await User.findAll({
        include: {
            model: Role,
            as: 'role',
            where: {
                name: role
            }
        }
    })
    let notifications = [];

    for (let user of admin1Users) {
        notifications.push(await Notification.create({
            type: CLAIM_SUBMITTED.type,
            title: CLAIM_SUBMITTED.title,
            url: role == 'AKAUNTAN' ? '/dashboard' : CLAIM_SUBMITTED.url,
            description: CLAIM_SUBMITTED.description(nama),
            notificationUserId: user.id,
        }))
    }

    Promise.all(notifications).then(res => {
        broadcastMessage('notifications', res);
    }).catch(e => console.error(e))
}

const notifyApprovalClaim = async (userId, pengesahan) => {
    let notification = await Notification.create({
        type: CLAIM_APPROVAL.type,
        title: CLAIM_APPROVAL.title,
        url: CLAIM_APPROVAL.url,
        description: CLAIM_APPROVAL.description(pengesahan),
        notificationUserId: userId,
    })
    broadcastMessage('notifications', [notification])
}

const notifyPaymentPendingClaim = async (noRujukan) => {
    let akauntanUsers = await User.findAll({
        include: {
            model: Role,
            as: 'role',
            where: {
                name: 'AKAUNTAN'
            }
        }
    })
    let notifications = [];

    for (let akauntan of akauntanUsers) {
        notifications.push(await Notification.create({
            type: CLAIM_PENDING_PAYMENT.type,
            title: CLAIM_PENDING_PAYMENT.title,
            url: CLAIM_PENDING_PAYMENT.url,
            description: CLAIM_PENDING_PAYMENT.description(noRujukan),
            notificationUser: akauntan.id
        }))
    }
    let payload = {
        type: CLAIM_PENDING_PAYMENT.type,
        title: CLAIM_PENDING_PAYMENT.title,
        url: CLAIM_PENDING_PAYMENT.url,
        description: CLAIM_PENDING_PAYMENT.description(noRujukan),
    }
    broadcastMessage('notifications', payload, akauntanUsers.map(e => e.id))
    Promise.all(notifications).then(res => {
        return res

    }).catch(e => {
        console.error(e);
    })
}

const notifyAccountRegistered = async (nama) => {
    let admin1Users = await User.findAll({
        include: {
            model: Role,
            as: 'role',
            where: {
                name: 'ADMIN 1'
            }
        }
    })

    let notifications = [];
    for (let user of admin1Users) {
        notifications.push(await Notification.create({
            type: ACCOUNT_REGISTERED.type,
            title: ACCOUNT_REGISTERED.title,
            url: ACCOUNT_REGISTERED.url,
            description: ACCOUNT_REGISTERED.description(nama),
            notificationUserId: user.id,
        }))
    }
    Promise.all(notifications).then(res => {
        broadcastMessage('notifications', res);
    }).catch(e => console.error(e));
}

const broadcastMessage = async (hub, notifications) => {
    let serviceClient = new WebPubSubServiceClient(process.env.AZURE_WEB_PUB_SUB_CONNECTION_STRING, hub);
    notifications.forEach(e => {
        serviceClient.userExists(e.notificationUserId).then(exists => {
            if (exists) {
                console.log(`yes user exists = `, e.notificationUserId);
                serviceClient.sendToUser(e.notificationUserId, {
                    id: e.id,
                    type: e.type,
                    title: e.title,
                    description: e.description,
                    url: e.url,
                    createdAt: e.createdAt
                })
            }
        })
    })
}

module.exports = {
    notifySubmittedClaim,
    notifyApprovalClaim,
    notifyPaymentPendingClaim,
    notifyAccountRegistered
}