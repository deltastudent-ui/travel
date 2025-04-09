
const Listing = require("./models/listing");
const expressError = require("./Error/expressError");
const{listingSchema} = require("./joiSchema");
const reviews = require("./models/reviews");


module.exports.isloggedIn = (req,res, next)=>{
    if(!req.isAuthenticated()){   // agar ye function true retun kiya hai to humara user authenticate hai false retun kiya to user authenticated nhi hai
       
       // mai agar add new listings p clicl karta hu to agar mai login nhi hu to mai login karunga aur mai /lidtings p redirect hone k bajay hu usi new lisitngs wale path p chale jayrnge is req.originlUrl ki help se jo humara original path store karta hai 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in create a listings");  // is condition   ka matalb hai ki yadi humara user looged/ signup  in nhi hai to us case m y flash msg send kar dega aur login p redirect karwa dega
        return res.redirect("/login");
      }
      next();  // agar user authenticated hota hai to us case me next ko call kar do nhi to login p redirect kar do 
};


//  y jiss url par se huma login p ja rahe hai after login usi url p wapas aa jaye hum  aur hume use routs define karne k bad hi dena padega

module.exports.saveredirectUrl = (req,res, next)=>{
  if( req.session.redirectUrl ){
    res.locals.redirectUrl =  req.session.redirectUrl ;
  }
  console.log("saveredirecturl   is running")

  next();
};


// jo user listing ko crerte kiya hai wahi bas delete edit kar sakta hai vo show wale condtion se bas yahi tak vo simit tha but agar api hopscotch se request bheje koi to vo impliment ho jayega but ssase nhi hoga

module.exports.isOwner = async (req,res , next)=>{
    let {id} = req.params;
    // pahale to id ko find karenge hpir condition lagayenge ki agar jo user humare listing ko edit kar raha hai kya vo humare listing ka owner hai 
    let lisitng = await Listing.findById(id);
     req.flash("error", "you are not the owner of this listings");
     res.redirect(`/listings/${id}`);
    
    console.log("isowner in is running")

    next();
    // yaha tak 
}

// for crete a funtion for convert to middleware validation schema 
module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    console.log("validation is running")
    if(error){
      let errmsg = error.details.map((el)=> el.message).join(",");
      throw new expressError(404,errmsg);
    } 
    else{
      next(error);
    }
  }
        // for delete reviews
//  // isloggedIn mean check karo ki humara user login hai   // jo is reviews ko delete kar raha hai kya vo is revires ka atuher hai
 

module.exports.isReviewAuther = async (req,res , next)=>{
  console.log("isauther is running");
  let {id,reviewId} = req.params;  // id aextreact kiye hai redirect k liye aur reviewId post review m se liya gaya hai
  let reviewss = await reviews.findById(reviewId);
  if(!reviewss.auther.equals(res.locals.currUser._id)){
   req.flash("error", "you did not create this reviews");
  return  res.redirect(`/listings/${id}`);
  }
  next();
}