const {
  registerSchema,
  firstnameSchema,
  lastnameSchema,
  emailSchema,
  usernameSchema,
  passwordSchema
} = require("./allFieldsSchema");
const { loginSchema } = require("./loginSchema");
const { sessionCookieSchema } = require("./sessionCookieSchema");

exports.registerValidator = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.loginValidator = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.sessionCookieValidator = (req, res, next) => {
  const { error } = sessionCookieSchema.validate(req.headers, {
    abortEarly: false,
    allowUnknown: true
  });
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.profileValidator = (req, res, next) => {
  let result = {};
  switch (req.body.type) {
    case "firstname":
      result = firstnameSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    case "lastname":
      result = lastnameSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    case "email":
      result = emailSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    case "username":
      result = usernameSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    case "password":
      result = passwordSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    case "delete":
      result = passwordSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      break;
    default:
      result = {
        error: {
          details: [
            {
              message: "Type provided not available"
            }
          ]
        }
      };
  }

  if (result.error) return res.status(400).json({ error: result.error.details[0].message });
  next();
};
