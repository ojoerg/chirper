const path = require('path');
const express = require("express");
const connectDB = require("./config/db")

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" })

connectDB();

const posts = require("./routes/posts");
const app = express();
app.use(express.json())
app.use("/api/v1/posts", posts)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  }

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))