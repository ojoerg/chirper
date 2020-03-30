const express = require("express");
const router = express.Router();
const { fileUpload, filePath } = require("../controllers/fileController");
const {} = require("./validation/validator");

// Upload file
router
  .route("/upload")
  .post(fileUpload);

// Get Path to file
router
  .route("/path")
  .post(filePath);

module.exports = router;
