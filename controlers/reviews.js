const reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.postReviews  = async (req, res, next) => {
    let { id } = req.params;
    let listings = await Listing.findById(id);
    let newReview = new reviews(req.body.review); // Fix here: Use req.body.review
    newReview.auther = req.user._id;
    listings.reviews.push(newReview);
    console.log(newReview, req.user);
    await newReview.save();
    await listings.save();
    req.flash("success", " New Review Added!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.deleteReviews = async(req, res)=>{  //isReviewAuther mean =//  // isloggedIn mean check karo ki humara user login hai   // jo is reviews ko delete kar raha hai kya vo is revires ka atuher hai
 
    let {id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
       await  reviews.findByIdAndDelete(reviewId);
       req.flash("success", " Reviews deleted!");
    res.redirect(`/listings/${id}`);          
   
};