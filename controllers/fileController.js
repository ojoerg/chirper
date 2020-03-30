const User = require("../models/User");
const Post = require("../models/Post");
const Session = require("../models/Session");
const passport = require("passport");
const fs = require("fs");
const { setPassword } = require("./helper/passwordHashSalt");
const { comparePasswords } = require("./helper/comparePasswords");

// @desc       Upload image
// @route      POST /api/v1/files
// @access     Public
exports.fileUpload = async (req, res, next) => {
  try {
    const { username, type, oldFile } = req.body;
    if (!req.files) {
      return res.status(400).json({
        success: false,
        error: "Please provide a file!"
      });
    }

    const file = req.files.profilePicture ? req.files.profilePicture : req.files.file;

    console.log(type);

    if (
      type === "profilePicture" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/gif"
    ) {
      return res.status(400).json({
        success: false,
        error: "Wrong filetype provided!"
      });
    } else if (
      type === "post" &&
      !file.mimetype !== "image/png" &&
      !file.mimetype !== "image/jpeg" &&
      !file.mimetype !== "image/gif" &&
      !file.mimetype !== "video/mpeg" &&
      !file.mimetype !== "video/mp4" &&
      !file.mimetype !== "video/ogg"
    ) {
      return res.status(400).json({
        success: false,
        error: "Wrong filetype provided!"
      });
    } else if (file.size > 10485760) {
      //10 MB
      return res.status(400).json({
        success: false,
        error: "File too big!"
      });
    }

    //const fileType = file;
    const fileName =
      Math.random()
        .toString(36)
        .substr(2, 15) + file.mimetype.replace(/.*\/(.*)$/, "." + "$1");

    console.log(req.files);

    await file.mv("./UserFiles/ProfilePictures/" + fileName);
    await User.updateOne({ username }, { profilePicture: fileName });

    await fs.unlinkSync("./UserFiles" + oldFile);
    return res.status(200).json({
      success: true,
      data: "/ProfilePictures/" + fileName
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};

// @desc       Get image name
// @route      POST /api/v1/files
// @access     Public
exports.filePath = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "No user found"
      });
    }

    return res.status(200).json({
      success: true,
      path: "/ProfilePictures/" + user.profilePicture
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
