const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostsFromUser,
  addPost,
  getFollowedPosts,
  deletePost
} = require("../controllers/postController");

router
  .route("/")
  .get(getPosts)
  .post(addPost);

router
  .route("/")
  .post(getPostsFromUser);

router.route("/followed").post(getFollowedPosts);

router.route("/:id").delete(deletePost);

module.exports = router;
