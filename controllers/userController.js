const User = require("../models/User");
const Session = require("../models/Session");
const passport = require("passport");
const { setPassword } = require("./helper/passwordHashSalt");

// @desc       Get all users
// @route      GET /api/v1/users
// @access     Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("username -_id");
    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    console.log(err);
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

    const user = await User.findOne({ username }).select("name username email -_id");
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.log(err);
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
    const { type, text, username } = req.body;

    const sessionId = req.sessionID;
    const session = await Session.findOne({ _id: sessionId });

    if (!session) {
      return res.status(400).json({
        success: false,
        error: "User not found"
      });
    } else if (username !== JSON.parse(session.session).username){
      return res.status(401).json({
        success: false,
        error: "Usernames do not match"
      });
    }

    const user = await User.findOne({ username });
    let newUserUpdate, newUsername;

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found"
      });
    }

    switch (type) {
      case "name":
        newUserUpdate = await User.updateOne({ username }, { name: text });
        break;
      case "email":
        newUserUpdate = await User.updateOne({ username }, { email: text });
        break;
      case "password":
        const password = await setPassword(text[0]);
        newUserUpdate = await User.updateOne({ username }, { password: password });
        break;
      case "username":
        newUserUpdate = await User.updateOne({ username }, { username: text });
        break;
    }
    
    type === "username" ? (newUsername = text) : (newUsername = username);
    const newUser = await User.findOne({username: newUsername})

    return res.status(200).json({
      success: true,
      username: newUsername,
      user: newUser
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
  passport.authenticate("local", async (err, user, info) => {
    try {
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
      const userFound = await User.findOne({ username: user.username });

      if (!userFound) {
        return res.status(500).json({
          success: false,
          error: "Server Error"
        });
      }

      return res.status(200).json({
        success: true,
        username: user.username,
        follows: userFound.follows
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  })(req, res, next);
};

// @desc       Get one user by username
// @route      GET /api/v1/users
// @access     Public
exports.authenticatedUser = async (req, res, next) => {
  try {
    const sessionId = req.sessionID;
    const session = await Session.findOne({ _id: sessionId });

    if (session) {
      const username = JSON.parse(session.session).username;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(500).json({
          success: false,
          error: "Server Error"
        });
      }

      return res.status(200).json({
        success: true,
        username: username,
        follows: user.follows
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
    console.log(err);
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

// @desc       Add user to follow
// @route      POST /api/v1/users/follow
// @access     Public
exports.followUser = async (req, res, next) => {
  try {
    const { username, userToFollow } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not Found"
      });
    }
    if (!user.follows.includes(userToFollow) && userToFollow !== username) {
      user.follows = [...user.follows, userToFollow];
    } else {
      return res.status(400).json({
        success: false,
        error: "You already follow this user"
      });
    }

    await User.updateOne({ username }, { follows: user.follows });

    return res.status(200).json({
      success: true,
      data: userToFollow
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
