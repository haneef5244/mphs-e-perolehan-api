const { decodeToken } = require("../helper/authDecode");
const { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");

const getFile = async (req, res) => {

    try {
        const { claimId } = req.params;
        const { id, role } = decodeToken(req);

        let claim = await Claim.findOne({
            where: {
                id: claimId
            }
        })

        if (claim) {
            if (role.name == 'SETIAUSAHA'
                || role.name == 'ADMIN 1'
                || role.name == 'ADMIN 2'
                || claim.userId == id) {
                const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING);
                const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CLAIM_CONTAINER_NAME);

                const blobClient = containerClient.getBlobClient(claim.dataValues.receipt);

                const blobSAS = generateBlobSASQueryParameters({
                    containerName: process.env.AZURE_BLOB_CLAIM_CONTAINER_NAME,
                    blobName: claim.dataValues.receipt,
                    permissions: BlobSASPermissions.parse("racwd"),
                    startsOn: new Date(),
                    expiresOn: new Date(new Date().valueOf() + 86400)
                }, new StorageSharedKeyCredential(process.env.AZURE_BLOB_ACCOUNT, process.env.AZURE_BLOB_SAS_KEY)).toString();

                const sasUrl = blobClient.url + "?" + blobSAS;

                return res.status(200).json({ message: 'File successfully retrieved!', data: { file: sasUrl } });
            } else {
                return res.status(401).json({ message: 'Unauthorized!' });
            }
        }
        res.status(200).json({ message: 'Successfully retrieved file!' })
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}
const getDokumenTender = async (req, res) => {

    try {
        const { name } = req.params;
        const { id, role } = decodeToken(req);

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_DOKUMEN_TENDER_CONTAINER);

        const blobClient = containerClient.getBlobClient(name);

        const blobSAS = generateBlobSASQueryParameters({
            containerName: process.env.AZURE_BLOB_DOKUMEN_TENDER_CONTAINER,
            blobName: name,
            permissions: BlobSASPermissions.parse("racwd"),
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + 86400)
        }, new StorageSharedKeyCredential(process.env.AZURE_BLOB_ACCOUNT, process.env.AZURE_BLOB_SAS_KEY)).toString();

        const sasUrl = blobClient.url + "?" + blobSAS;

        return res.status(200).json({ message: 'File successfully retrieved!', data: { file: sasUrl } });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
}

module.exports = {
    getFile,
    getDokumenTender
}