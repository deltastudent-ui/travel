const express = require("express");
const router = express.Router();  // router obj 

// for requiring models 
const Listing = require("../models/listing.js")
const wrapAsync = require("../Error/wrapAsync.js");


// for requiring conteroler in listings

const ListingControler = require("../controlers/listing.js");

//requiring middleware
const {isloggedIn, isOwner, validateListing} = require("../middlewere.js");

// for requiring and use multer
const multer = require("multer");
// for requiring cloudeconfig--
const {storage} = require("../cloudeconfig.js")
const upload = multer({ storage })

router.get("/search",(ListingControler.search));
// router .route ka mean hai ki jo jo same path p request ja arha hai hai use sara isi m likh do ---
router.route("/")
.get(wrapAsync(ListingControler.index)) // listing controler ko isi tarah pass kar denge 
.post( isloggedIn ,  upload.single('image'), wrapAsync(ListingControler.postRoutes));



  router.get("/new", isloggedIn, wrapAsync(ListingControler.renderNewForm));


  router.route("/:id")
  .get(wrapAsync(ListingControler.showRoutes)) // new route ka get wala ahia
  .put(isloggedIn, upload.single('listing[image]'), validateListing,wrapAsync(ListingControler.editPut)) // put route 
  .delete(isloggedIn, wrapAsync(ListingControler.delteRoutes)); // delete route 
  // edit and update rout 

  router.get("/:id/edit",isloggedIn, wrapAsync(ListingControler.editGet));


  // delete routes

  // search rout 


  module.exports= router;