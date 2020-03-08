const mongoose  = require("mongoose");

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add some text"]
    },
    user: {
        type: String,
        required: [true, "Please add a user"],
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", PostSchema)