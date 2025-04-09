const express = require("express");
const router = express.Router();

// requirng usermodel
const User = require("../models/user.js");
const wrapAsync = require("../Error/wrapAsync");
const passport = require("passport");
// requiring middle were k ander saveredirect url hai usem se !
const { saveredirectUrl } = require("../middlewere.js");
// for requireing controler userjs
const controlerUSer = require("../controlers/user.js");


//signup
router.route("/signup")
.get(controlerUSer.signUpGet) // signup ka get 
.post(wrapAsync(controlerUSer.SignupPost)); // signup ka post

//login
 

router.route("/login")
.get(controlerUSer.loginGet) // login ka get
// agar mer aauthentication true return kiya to passport humara session ko delete kar deta hai isiliye hum req.session.redirectUrl ko local variable m strore karawaenge .. middlewere file m 
.post( saveredirectUrl, // passport jaise hi user ko authete kar raha hai usase pahale locals ko save karawana hai
    passport.authenticate("local", {
   failureRedirect: "/login",
   failureFlash: true,
}), controlerUSer.loginPost); //login ka post



// router.post("/login", passport.authenticate("local", {failureRedirect:"/login", failureFlash:true}), // agar authenticate fail ho gaya tab yahi se login wale page p wapas ho jayenge true hua authentication to us case m hum niche req, res ko jaynge
//  async(req,res)=>{
//     console.log("success");
//     // res.send("wellcome to wonderlust you are logged in!");
// });


//logout
router.get("/logout",controlerUSer.logout);

module.exports = router;