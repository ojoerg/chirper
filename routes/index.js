const express = require("express");
const router = express.Router();
const { getUsers, loginUser, addUser, authenticatedUser, deleteUser } = require("../controllers/userController")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Find all Users
router
    .route("/")
    .get(getUsers)

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