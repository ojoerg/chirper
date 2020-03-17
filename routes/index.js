const express = require("express");
const router = express.Router();
const { getUsers, getUser, loginUser, addUser, authenticatedUser, logoutUser, changeUser, deleteUser } = require("../controllers/userController")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Find all Users
// Find one User
router
    .route("/")
    .get(getUsers)
    .post(getUser)

// Register User
router
    .route("/register")
    .post(addUser);

// Login User
router
    .route("/login")
    .post(loginUser)

// Authenticate User
router
    .route("/authenticated")
    .get(authenticatedUser)

// Logout User
router
    .route("/logout")
    .get(logoutUser)

// Change User
router
    .route("/change")
    .post(changeUser)

// Delete User
router
    .route("/:username")
    //.get(getUser)
    .delete(deleteUser)

/*router 
    .route("/login")
    .post((req, res, next) => {
        passport.authenticate('local', {
          successRedirect: '/dashboard',
          failureRedirect: '/users/login',
          failureFlash: true
        })(req, res, next);
    })*/

module.exports = router;