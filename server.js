const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 3000;
const session = require("express-session");

// Middleware
// allows us to use put and delete methods
app.use(methodOverride("_method"));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));

// Database
mongoose.connect("mongodb://localhost:27017/auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);

// Routes
app.get("/app", (req, res) => {
  if (req.session.currentUser) {
    res.send("the party");
  } else {
    res.redirect("/sessions/new");
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});

const usersController = require("./controllers/users.js");
app.use("/users", usersController);
const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

// Listen
app.listen(PORT, () => console.log("auth happening on port", PORT));
