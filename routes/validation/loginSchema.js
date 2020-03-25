const Joi = require("@hapi/joi");

const username = Joi.string()
  .trim()
  .alphanum()
  .required()
  .messages({
    "string.base": "This username is not allowed",
    "string.empty": "Please enter a username",
    "string.alphanum": 'Please enter only the following characters: " A-Z, a-z, 0-9 "',
    "string.required": "Please enter a username (required)"
  });

const password = Joi.string()
  .required()
  .messages({
    "string.base": "This password is not allowed",
    "string.empty": "Please enter a password",
    "string.required": "Please enter a password"
  });

exports.loginSchema = Joi.object({
  username: username,
  password: password
});
