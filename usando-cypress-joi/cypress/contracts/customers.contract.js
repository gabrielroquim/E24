const Joi = require ('joi')

const customersSchema = Joi.object({
    address: Joi.string(),
        id: Joi.string(),    
    createdAt: Joi.string(),
        nome: Joi.string(),
        email: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        phone: Joi.string(),
        updatedAt: Joi.string()

})
export default customersSchema


