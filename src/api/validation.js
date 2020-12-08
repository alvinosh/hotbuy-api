const { Joi, Segments } = require("celebrate");
/**
 * register validator
 */
module.exports.register = {
  // TODO : FIX ERRORS MESSAGES
  [Segments.BODY]: Joi.object().keys({
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    password: Joi.string().required().min(6).label("Password"),
    repeat_password: Joi.ref("password"),
    email: Joi.string().min(6).required().email().label("Email"),
    username: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.number().integer().required()
  })
};

/**
 * login validator
 */
module.exports.login = {
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Email")
  })
};

module.exports.review = {
  [Segments.BODY]: Joi.object().keys({
    comment: Joi.string().required().min(6).label("Comment"),
    reciever: Joi.number().integer().required()
  })
};

module.exports.queryId = {
  [Segments.QUERY]: Joi.object().keys({
    id: Joi.number().integer().required()
  })
};
