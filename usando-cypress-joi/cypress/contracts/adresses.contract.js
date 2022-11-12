const Joi = require ('joi')

const adressSchema = Joi.object({
    address_1: Joi.string(),
    address_2: Joi.string(),    
    city: Joi.string(),
    createdAt: Joi.string(),
    id: Joi.string(),
    state: Joi.string(),
    updatedAt: Joi.number(),
    zip: Joi.number(),
        

})
export default adressSchema

