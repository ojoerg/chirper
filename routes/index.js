const express = require("express");
const router = express.Router();
const { getUsers, getUser, addUser, deleteUser } = require("../controllers/userController")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router
    .route("/")
    .get(getUsers)
    .post(addUser);

router
    .route("/:username")
    .get(getUser)
    .delete(deleteUser)

module.exports = router;