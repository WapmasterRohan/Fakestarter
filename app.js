const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const SHA256 = require("crypto-js/sha256");

const Campground = require("./models/campaign");
const Tx = require("./models/transaction");
const User = require("./models/user");
const Block = require("./models/block");

const campaignRoutes = require("./routes/campaigns"),
const indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/fakestarter");

const secret = require("./secret-details");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "secret.passportSecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });
 

app.listen(PORT, process.env.IP, () => {
    console.log("The YelpCamp Server Has Started at " + PORT + "!");
 });