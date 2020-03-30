const Joi = require("@hapi/joi");

const firstAndLastname = Joi.string()
  .trim()
  .pattern(/^(?=.{1,41}$)[a-zA-ZäöüÄÖÜ]+(?:[-'\s][a-zA-ZäöüÄÖÜ]+)*$/)
  .min(2)
  .max(40)
  .required()
  .messages({
    "string.base": "This name is not allowed",
    "string.empty": "Please enter a name",
    "string.pattern.base":
      'Please enter only the following characters: " A-Z, a-z, -, \' " or space',
    "string.min": "Please enter a name with at least 2 characters",
    "string.max": "Please enter a name with at most 40 characters",
    "string.required": "Please enter a name (required)"
  });

const username = Joi.string()
  .trim()
  .alphanum()
  .min(2)
  .max(40)
  .required()
  .messages({
    "string.base": "This username is not allowed",
    "string.empty": "Please enter a username",
    "string.alphanum": 'Please enter only the following characters: " A-Z, a-z, 0-9 "',
    "string.min": "Please enter a username with at least 2 characters",
    "string.max": "Please enter a username with at most 40 characters",
    "string.required": "Please enter a username (required)"
  });

const email = Joi.string()
  .trim()
  .email()
  .required()
  .messages({
    "string.base": "This e-mail is not allowed",
    "string.empty": "Please enter a e-mail",
    "string.email": "Please enter a valid e-mail",
    "string.required": "Please enter a e-mail (required)"
  });

const password = Joi.string()
  .min(7)
  .required()
  .strict()
  .messages({
    "string.base": "This password is not allowed",
    "string.empty": "Please enter a password with at least 7 characters",
    "string.required": "Please enter a password with at least 7 characters"
  });

const password2 = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .strict()
  .messages({
    "string.base": "Passwords don't match",
    "string.empty": "Passwords don't match",
    "string.valid": "Passwords don't match",
    "string.required": "Passwords don't match"
  });

const type = Joi.string()
  .pattern(/profilePicture|post/)
  .required()
  .messages({
    "string.base": "This type is not allowed",
    "string.empty": "This type is not allowed",
    "string.pattern.base": "This type is not allowed",
    "string.required": "This type is not allowed"
  });

const oldFile = Joi.string()
  .pattern(
    /^\/ProfilePictures\/[a-z0-9]+\.(png|jpeg|jpg|gif|mpeg|mpg|mp4|ogg|PNG|JPEG|JPG|GIF|MPEG|MPG|MP4|OGG)$/
  )
  .messages({
    "string.base": "Wrong filename for previous profile picture provided",
    "string.empty": "Wrong filename for previous profile picture provided",
    "string.pattern.base": "Wrong filename for previous profile picture provided"
  });

const text = Joi.string()
  .required()
  .messages({
    "string.base": "This text is not allowed",
    "string.empty": "Please enter text",
    "string.required": "Please enter text (required)"
  });

exports.registerSchema = Joi.object({
  firstname: firstAndLastname,
  lastname: firstAndLastname,
  username: username,
  email: email,
  password: password,
  password2: password2
});

exports.firstnameSchema = Joi.object({
  text: firstAndLastname
});

exports.lastnameSchema = Joi.object({
  text: firstAndLastname
});

exports.emailSchema = Joi.object({
  text: email
});

exports.usernameSchema = Joi.object({
  text: username
});

exports.passwordSchema = Joi.object({
  password: password,
  password2: password2
});

exports.addPostSchema = Joi.object({
  username: username,
  text: text
});

exports.fileSchema = Joi.object({
  username: username,
  type: type,
  oldFile: oldFile
});

exports.getPostsSchema = Joi.object({
  username: username
});