const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  username: {
    type: String,
    required: [true, "Please add a username"],
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
  answers: [
    {
      text: String,
      username: {
        type: String,
        required: [true, "Please add a username"],
      },
      created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Post", PostSchema);
