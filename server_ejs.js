const path = require('path');
const express = require("express");
const connectDB = require("./config/db")
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")

const posts = require("./routes/posts");

dotenv.config({ path: "./config/config.env" })

require("./config/passport")(passport)


connectDB();

const app = express();

app.use(expressLayouts)
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Routes
app.use("/api/v1/posts", posts)
app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
  }

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))