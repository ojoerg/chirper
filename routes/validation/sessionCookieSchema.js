const Joi = require("@hapi/joi");

const cookie = Joi.string().required();

exports.sessionCookieSchema = Joi.object({
  cookie: cookie
});
