const Joi = require("@hapi/joi")

const registerAuthSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).required()
})
const loginAuthSchema = Joi.object({
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).required()
})

module.exports = {registerAuthSchema,loginAuthSchema};