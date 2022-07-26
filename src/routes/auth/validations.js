const Joi = require("joi");
const constants = require("../../constants/index");

const { USER_TYPES } = constants;

const allowedUserTypes = Object.keys(USER_TYPES);

const validator = (schema) => async (payload) => {
    try {
        return schema.validateAsync(payload, { abortEarly: false });
    } catch (error) {
        const formattedMessage = error.details.map((err) => err.message);
        throw new Error(formattedMessage);
    }
};

const register = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(3).max(15).required(),
        userType: Joi.string().required().valid(...allowedUserTypes),
    });
    return validator(schema)(payload);
};

module.exports = {
    register,
};
