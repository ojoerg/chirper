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
  followUser,
  deleteUser
} = require("../controllers/userController");

// Find all Users
// Find one User
router
  .route("/")
  .get(getUsers)
  .post(getUser);

// Register User
router.route("/register").post(addUser);

// Login User
router.route("/login").post(loginUser);

// Authenticate User
router.route("/authenticated").get(authenticatedUser);

// Logout User
router.route("/logout").get(logoutUser);

// Change User
router.route("/change").post(changeUser);

// Follow User
router.route("/follow").post(followUser);

// Delete User
router
  .route("/:username")
  //.get(getUser)
  .delete(deleteUser);


module.exports = router;
