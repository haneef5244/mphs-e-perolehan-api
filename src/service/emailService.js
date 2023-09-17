const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const { template, claimUpdateTemplate, paymentMadeTemplate, requireApprovalTemplate, forgotPasswordEmail } = require('../email/template/emailVerification');
const { User, Role } = require("../models");

function sendRegistrationVerificationMail(mailProps) {
    try {
        const { namaPertama, email, verificationId } = mailProps;

        const verificationUrl = `${process.env.MPHS_DASHBOARD_URL}/verification/${verificationId}`

        const message = {
            senderAddress: process.env.AZURE_SENDER_EMAIL,
            recipients: {
                to: [{ address: email }],
            },
            content: {
                subject: "[MPHS-ePerolehan] Verifikasi Email",
                plainText: "This is plaintext body of test email.",
                html: template(namaPertama, verificationUrl),
            },
        }

        const client = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
        client.beginSend(message);
    }
    catch (ex) {
        console.error(ex);
    }
}

function sendUpdateForClaim(mailProps) {
    try {
        const { namaPertama, referenceNo, approved, approverName, email } = mailProps;

        const claimUrl = `${process.env.MPHS_DASHBOARD_URL}/sejarah?isRedirect=true`

        const message = {
            senderAddress: process.env.AZURE_SENDER_EMAIL,
            recipients: {
                to: [{ address: email }],
            },
            content: {
                subject: `[MPHS-eClaim] [No. Rujukan ${referenceNo}] Maklumat Tuntutan`,
                plainText: "This is plaintext body of test email.",
                html: claimUpdateTemplate(namaPertama, referenceNo, approved, approverName, claimUrl),
            },
        }

        const client = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
        client.beginSend(message);
    }
    catch (ex) {
        console.error(ex);
    }
}

function sendPaymentMadeMail(mailProps) {
    try {
        const { namaPertama, referenceNo, approverName, email, amaunBayaran } = mailProps;

        const claimUrl = `${process.env.MPHS_DASHBOARD_URL}/sejarah?isRedirect=true`

        const message = {
            senderAddress: process.env.AZURE_SENDER_EMAIL,
            recipients: {
                to: [{ address: email }],
            },
            content: {
                subject: `[MPHS-eClaim] [No. Rujukan ${referenceNo}] Bayaran Tuntutan`,
                plainText: "This is plaintext body of test email.",
                html: paymentMadeTemplate(namaPertama, referenceNo, amaunBayaran, approverName, claimUrl),
            },
        }

        const client = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
        client.beginSend(message);
    }
    catch (ex) {
        console.error(ex);
    }
}

async function sendClaimRequireApproval(mailProps, role) {
    try {
        const { namaPertama, referenceNo, amaun } = mailProps;

        let users = await User.findAll({
            include: {
                model: Role,
                as: 'role',
                where: {
                    name: role
                }
            }
        })
        let pengesahan = ''
        if (role == 'ADMIN 1') {
            pengesahan = 'Pengesahan'
        } else if (role == 'ADMIN 2') {
            pengesahan = 'Sokongan'
        } else if (role == 'SETIAUSAHA') {
            pengesahan = 'Kelulusan'
        } else if (role == 'AKAUNTAN') {
            pengesahan = 'Pembayaran'
        }

        const claimUrl = `${process.env.MPHS_DASHBOARD_URL}/pengesahan?isRedirect=true`

        for (let user of users) {
            const message = {
                senderAddress: process.env.AZURE_SENDER_EMAIL,
                recipients: {
                    to: [{ address: user.email }],
                },
                content: {
                    subject: `[MPHS-eClaim] [No. Rujukan ${referenceNo}] ${pengesahan} Tuntutan`,
                    plainText: "This is plaintext body of test email.",
                    html: requireApprovalTemplate(referenceNo, pengesahan, user.namaPertama + ' ' + user.namaTerakhir, amaun, claimUrl),
                },
            }

            const client = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
            client.beginSend(message);
        }
    }
    catch (ex) {
        console.error(ex);
    }
}

function sendResetPasswordEmail(mailProps) {
    try {
        const { nama, email, forgotPasswordToken } = mailProps;

        const verificationUrl = `${process.env.MPHS_DASHBOARD_URL}/forgotPassword/${forgotPasswordToken}`

        const message = {
            senderAddress: process.env.AZURE_SENDER_EMAIL,
            recipients: {
                to: [{ address: email }],
            },
            content: {
                subject: "[MPHS-eClaim] Reset Kata Laluan",
                plainText: "Reset Kata Laluan Anda.",
                html: forgotPasswordEmail(nama, verificationUrl),
            },
        }

        const client = new EmailClient(process.env.AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);
        client.beginSend(message);
    }
    catch (ex) {
        console.error(ex);
    }
}

module.exports = {
    sendRegistrationVerificationMail,
    sendUpdateForClaim,
    sendPaymentMadeMail,
    sendClaimRequireApproval,
    sendResetPasswordEmail
}