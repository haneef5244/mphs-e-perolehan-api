module.exports = {
    CLAIM_SUBMITTED: {
        type: 'CLAIM_SUBMITTED',
        title: 'Tuntutan Baru',
        url: `/pengesahan`,
        description: (nama) => `${nama}`
    },
    CLAIM_APPROVAL: {
        type: 'CLAIM_APPROVAL',
        title: `Status Tuntutan`,
        url: `/sejarah`,
        description: (pengesahan) => `Tuntutan anda telah ${pengesahan}`
    },
    CLAIM_PENDING_PAYMENT: {
        type: 'CLAIM_PENDING_PAYMENT',
        title: `Tuntutan Menunggu Bayaran`,
        url: `/pengesahan`,
        description: (noRujukan) => `Tuntutan ${noRujukan} menunggu bayaran`
    },
    ACCOUNT_REGISTERED: {
        type: 'ACCOUNT_REGISTERED',
        title: 'User Baru',
        url: `/dashboard`,
        description: (nama) => `${nama} telah mendaftar akaun`
    }

}