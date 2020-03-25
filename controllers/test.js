const User = require("../models/User");
const Post = require("../models/Post");
const Session = require("../models/Session");
const passport = require("passport");
const { setPassword } = require("./helper/passwordHashSalt");

exports.test = async (req, res, next) => {
  try {
    let text = "test";

    return res.status(200).json({
      success: true,
      test: text
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};
