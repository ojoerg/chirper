const express = require("express");
const router = express.Router();
const { getPosts, addPost, deletePost } = require("../controllers/chirperController")

router
    .route("/")
    .get(getPosts)
    .post(addPost);

router
    .route("/:id")
    .delete(deletePost)


module.exports = router;