const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  loginUser,
  addUser,
  authenticatedUser,
  logoutUser,
  changeUser,
  followUser
} = require("../controllers/userController");
const { registerValidator, loginValidator, sessionCookieValidator, profileValidator } = require("./validation/validator"); 

// Find all Users
// Find one User
router
  .route("/")
  .get(getUsers)
  .post(getUser);

// Register User
router.route("/register").post(registerValidator, addUser);

// Login User
router.route("/login").post(loginValidator, loginUser);

// Authenticate User
router.route("/authenticated").get(sessionCookieValidator, authenticatedUser);

// Logout User
router.route("/logout").get(sessionCookieValidator, logoutUser);

// Change User
router.route("/change").post(profileValidator, changeUser);

// Follow User
router.route("/follow").post(followUser);


module.exports = router;
 