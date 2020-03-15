const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
//   expires: {
//     type: Date,
//     required: true
//   },
  session: {
    type: String,
    required: true
  }
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
