const Joi = require('joi');

const registrationQuerySchema = Joi.object({
    namaPertama: Joi.string().required(),
    namaTerakhir: Joi.string().required(),
    email: Joi.string().email().required(),
    kadPengenalan: Joi.string().required(),
    alamat1: Joi.string().required(),
    password: Joi.string().required(),
    jabatan: Joi.string().required(),
    jawatan: Joi.string().required(),
    phone: Joi.string().required(),
    alamat2: Joi.string().allow('').optional(),
    poskod: Joi.string().required(),
    bandar: Joi.string().required(),
    negeri: Joi.string().required()
})

const loginQuerySchema = Joi.object({
    kadPengenalan: Joi.string().required(),
    password: Joi.string().required(),
})

module.exports = {
    loginQuerySchema,
    registrationQuerySchema,
}