const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../Error/wrapAsync")
const{reviewschema} = require("../joiSchema");
const Listing = require("../models/listing");
const reviews = require("../models/reviews");
const { isloggedIn, isReviewAuther } = require("../middlewere");

// for requiring reviews controler
const reviewControler = require("../controlers/reviews");

// for requiring reviewshema joi
const validateReview = (req,res,next) => {
  let {error}  = reviewschema.validate(req.body);
 
  if(error) {
      let errorMsg= error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errorMsg);
  } else {
      next();
  }
};

       // abhi bhi koi hopscotch se bina login kiye reviews create kar sakta hai isiliye ise hume isloggedIn dena padegas
// reviws rout
router.post("/",isloggedIn, validateReview, wrapAsync(reviewControler.postReviews));
  
  // for deleting reviews  --- 
  
  router.delete("/:reviewId",isloggedIn ,isReviewAuther,wrapAsync(reviewControler.deleteReviews));

  module.exports= router; 