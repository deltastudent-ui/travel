//dotenv 
if(process.env.NODE_ENV != "production"){ // mean jab huamre envirement ki value production p nhi hai tab hume .env ko use karna hai baki cases m nhi 
  require('dotenv').config();  // hume production k time .env file nhi bhejni hai so isiliye hum y kar rahe hai
};
console.log(process.env.SECREATE);

const express = require('express');
let app = express();

// for method override ---
const method = require("method-override");
app.use(method("_method"));

// ejs-mate requiring
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);

// requiring express-monog for cloud storage
// for requiring session 
const mongoStore = require("module")
const MongoStore = require('connect-mongo');
const session = require("express-session");

// for requiring flash..
const flash = require("connect-flash");

// cookie parsher 
const cookieParser = require("cookie-parser");


// for requiring passport
 
const passport = require("passport");
const LocalStatergy = require("passport-local");
// requiring User model 
const User = require("./models/user.js");


// moongse requie 

const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const dburl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connection succesfull");
})
.catch((err) => console.log(err));


async function main() {
  await mongoose.connect(MONGO_URL);

}

//require path -
let path = require('path');
const { count, error } = require('console');
const { title } = require('process');

// require for ejs --
app.set("view engine ", "views");
app.set("views", path.join(__dirname,"views"));

//  requireing public folder 

app.use(express.static(path.join(__dirname,"public")));

// make redable data for express----

app.use(express.urlencoded({extended:true}));

//requiring error--
const expressError = require('./Error/expressError.js');

// for requiring joischem a

const {listingSchema, reviewschema} = require("./joiSchema.js");

//requiring middleware
const {isloggedIn} = require("./middlewere.js");



// for accesing reviess model
const reviews = require('./models/reviews.js');
                                                       
                                                    // routers
// requiring alllisting k router
const listingRouter = require("./routs/alllistings.js");
// reviews 
const reviewRouter = require("./routs/reviewrestructure.js");
// user for signup

app.use(express.json());
 
                // ye mongoStore dusra hai na ki require ka

const store  = MongoStore.create({
       mongoUrl: MONGO_URL,
       crypto:{
        secret:process.env.SECRET,
       },
       touchAfter:24*3600
});

store.on("error",()=>{
  console.log("error in mongo session store,", error);
});


// define the session option --
const sessionoption = {
  store,
secret:process.env.SECRET,
resave:false,
saveUninitialized:true,
cookie:{
  expires:Date.now() + 7 * 24 * 60 *60 * 1000,
  maxAge:  7 * 24 * 60 *60 * 1000,
},
httpOnly:true,
}


const userRouter = require("./routs/user.js");


//for use cookie parser --- 

app.use(cookieParser());
  
// use session 
app.use(session(sessionoption));
app.use(flash());


// passport  as a middlewere

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));  
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// acces karne k liye routs se just pahle middle were m likhenge --
app.use((req,res, next)=>{
  res.locals.success = req.flash("success");  // isko de diye hai variable ab ise koi bhi ejs file m access kar sakte hai
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // ye  currUser (usme humre login ka data show karta hai)
  next()
});



//ye listings ko middlewere ki tahar diye hai isko 
app.use("/listings", listingRouter);  //yaha listings ka mean jo humne rout k require kiya hai wahi usi ka variable hai
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);




//  agar koi dusra rout open karta hia to 
app.all("*", (req, res, next)=>{
    next(new expressError(404, "page not found"));
})
 

app.use((err, req, res, next)=>{
  let {status= 404, message= "Somethink went wrong" }= err; 
  // res.status(status).send(message);
   res.status(status).render("error.ejs",{err});
})




app.listen(8080, ()=>{
  console.log("connect to db ");
})