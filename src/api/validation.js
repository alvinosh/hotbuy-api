const { celebrate, Joi, errors, Segments } = require("celebrate");
/**
 * register validator
 */
module.exports.register = {
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    password: Joi.string().required().min(6).label("Password"),
    repeat_password: Joi.ref("password"),
    email: Joi.string().min(6).required().email().label("Email"),
    username: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().integer()
  })
};

/**
 * login validator
 */
module.exports.login = {
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().min(6).label("Password"),
    email: Joi.string().min(6).required().email().label("Email")
  })
};
