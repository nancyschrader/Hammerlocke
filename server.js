const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
// PORT -- Allows use of Heroku's port or local port
const PORT = process.env.PORT || 3000;
const Coffee = require("./models/coffee.js");
const User = require("./models/users.js");
require("dotenv").config();

// MIDDLEWARE
// app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
  secret: "feedmeseymour", //some random string
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(__dirname + '/public'));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/hammerlocke'
// ^ might need to change to: mongodb://localhost:27017/Hammerlocke
// MONGOOSE
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const usersController = require("./controllers/users.js");
app.use("/users", usersController);
const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);
const coffeesController = require("./controllers/coffees.js");
app.use("/coffee", coffeesController);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connection path: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.once('open' , ()=>{ // might need to change to "ON" instead of "ONCE"
    console.log("Mongo CONNECTED!");
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

app.get("/locations", (req, res) => {
  res.render("locations.ejs");
});
// app.get("/coffee", (req, res) => {
//   res.render("coffee.ejs");
// });
app.get("/menu", (req, res) => {
  res.render("menu.ejs");
});




  app.get('/seed', (req, res)=>{
    Coffee.create([
        {
            brand:'Mcdonalds',
            name:'Regular Joe',
            taste:'Mild',
            inStock:true
        },
        {
            brand:'Stackbucks',
            name:'Layer',
            taste:'Bold',
            inStock:false
        },
        {
            brand:'Dunkin',
            name:'Tea',
            taste:'Weak',
            inStock:true
        }
    ], (err, data)=>{
        res.redirect('/');
    })
});


// Listen
app.listen(PORT, () => console.log("auth happening on port", PORT));
