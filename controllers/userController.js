const User = require("../models/User");
const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { setPassword } = require("./helper/passwordHashSalt");

// @desc       Get all users
// @route      GET /api/v1/users
// @access     Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("username");
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Get user
// @route      POST /api/v1/users
// @access     Public
exports.getUser = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username }).select("name username email");
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Change User
// @route      POST /api/v1/users/change
// @access     Public
exports.changeUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { type, text, username } = req.body;

    const user = await User.findOne({ username });
    let newUser, newUsername;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not Found"
      });
    }

    switch (type) {
      case "name":
        newUser = await User.updateOne({ username }, { name: text });
        break;
      case "email":
        newUser = await User.updateOne({ username }, { email: text });
        break;
      case "password":
        const password = await setPassword(text[0]);
        newUser = await User.updateOne({ username }, { password: password });
        break;
      case "username":
        newUser = await User.updateOne({ username }, { username: text });
        break;
    }

    type === "username" ? (newUsername = text) : (newUsername = username);

    return res.status(200).json({
      success: true,
      username: newUsername
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Get one user by username
// @route      GET /api/v1/users
// @access     Public
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (user === false) {
      const message = info.error;
      return res.status(401).json({
        success: false,
        error: message
      });
    }

    if (err) {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }

    req.session.username = user.username;

    return res.status(200).json({
      success: true,
      username: user.username
    });
  })(req, res, next);
};

// @desc       Get one user by username
// @route      GET /api/v1/users
// @access     Public
exports.authenticatedUser = async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const session = await Session.findOne({ _id: sessionId });
    if (session && JSON.parse(session.session).username) {
      return res.status(200).json({
        success: true,
        username: JSON.parse(session.session).username
      });
    } else {
      return res.status(401).json({
        success: false
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Add user
// @route      POST /api/v1/users
// @access     Public
exports.addUser = async (req, res, next) => {
  try {
    //const user = await User.create(req.body);
    const { name, username, email, password, password2 } = req.body;
    const hashSaltPassword = await setPassword(password);

    const user = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashSaltPassword
    });

    return res.status(201).json({
      success: true,
      message: "User successfully created"
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else if (/username_\d dup key/.test(err.errmsg)) {
      return res.status(400).json({
        success: false,
        error: "Username already in use"
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};

// @desc       Logout User
// @route      GET /api/v1/users/logout
// @access     Public
exports.logoutUser = async (req, res, next) => {
  try {
    if (req.session) {
      await req.logout(); //logout in passport (clear req.user)
      await req.session.destroy(); // logout in express-session
    }

    return res.status(200).json({
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Delete User
// @route      DELETE /api/v1/users/:username
// @access     Public
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found"
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
