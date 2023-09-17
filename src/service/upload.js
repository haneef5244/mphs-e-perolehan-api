const { BlobServiceClient } = require("@azure/storage-blob");

const upload = async (originalName, buffer, size, containerName) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `${new Date().getTime()}_${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, size);
    return blobName;
}

const uploadReceipt = async (originalName, buffer, size) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_CLAIM_CONTAINER_NAME);

    const blobName = `${new Date().getTime()}_${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, size);
    return blobName;
}

const uploadPaymentReceipt = async (originalName, buffer, size) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_PAYMENT_CONTAINER_NAME);

    const blobName = `${new Date().getTime()}_${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, size);

    return blobName;
}

const uploadProfilePicture = async (originalName, buffer, size) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION_STRING)

    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_BLOB_USER_AVATAR_CONTAINER_NAME);

    const blobName = `${new Date().getTime()}_${originalName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(buffer, size);

    return blobName;
}

module.exports = {
    uploadReceipt,
    uploadPaymentReceipt,
    uploadProfilePicture,
    upload
}