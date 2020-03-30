const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostsFromUser,
  addPost,
  getFollowedPosts,
  deletePost
} = require("../controllers/postController");
const { addPostValidator, getPostsValidator } = require("./validation/validator");

router
  .route("/")
  .get(getPosts)
  .post(addPostValidator, addPost);

router.route("/user").post(getPostsValidator, getPostsFromUser);

router.route("/followed").post(getPostsValidator, getFollowedPosts);

router.route("/:id").delete(deletePost);

module.exports = router;
