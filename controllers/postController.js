const Post = require("../models/Post");
const User = require("../models/User");
const arraySort = require("array-sort");

// @desc       Get all posts
// @route      GET /api/v1/posts
// @access     Public
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}, null, { sort: { created: -1 } });
    return res.status(200).json({
      success: true,
      data: posts
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Get posts from following users
// @route      POST /api/v1/posts/followed
// @access     Public
exports.getFollowedPosts = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    let posts = [];

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "No User Found"
      });
    }

    const followedUsers = [...user.follows, username];
    
    await Promise.all(
      followedUsers.map(async followedUser => {
        try {
          const postsFromOneUser = await Post.find({ username: followedUser });
          await postsFromOneUser.map(post => {
            posts = [...posts, post];
          });
        } catch (err) {
          throw err;
        }
      })
    );

    await arraySort(posts, "created", { reverse: true });

    return res.status(200).json({
      success: true,
      data: posts
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Add post
// @route      POST /api/v1/posts
// @access     Public
exports.addPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    return res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
      });
    }
  }
};

// @desc       Delete Post
// @route      DELETE /api/v1/posts/:id
// @access     Public
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "No post found"
      });
    }

    await post.remove();

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
