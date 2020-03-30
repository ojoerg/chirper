const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const MongoStore = require("connect-mongo")(session);
const fileUpload = require("express-fileupload");

const posts = require("./routes/posts");
const users = require("./routes/users");
const files = require("./routes/files");

dotenv.config({ path: "./config/config.env" });

require("./config/passport")(passport);

const dbConnection = connectDB();

const app = express();
app.disable("x-powered-by");

app.use(morgan("common"));
app.use(express.static(path.join(__dirname, '/UserFiles')));

app.use(fileUpload());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: new MongoStore({
      url: process.env.MONGO_URI
    }),
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 2 * 1000 // 2 days
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/posts", posts);
app.use("/api/v1/users", users);
app.use("/api/v1/files", files);
app.use("/test", require("./routes/test"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
