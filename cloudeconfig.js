// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require("dotenv").config();

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,                  
//     api_key: process.env.CLOUDINARY_API_KEY,   // Corrected key name
//     api_secret: process.env.CLOUDINARY_API_SECRET // Corrected key name
// });

// // Set up multer storage for Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'wanderlust_DEV',
//         allowedFormats: ["png", "jpg", "jpeg"],  // Fixed spelling mistake
//     },
// });

// module.exports = {
//     cloudinary,
//     storage
// };



// app.js

                // ye mongoStore dusra hai na ki require ka
                // console.log("MongoDB URL:", process.env.ATLASDB_URL);

// const store  = MongoStore.create({
//        mongoUrl: ,
//        crypto:{
//         secret:process.env.SECRET,
//        },
//        touchAfter:24*3600
// });

// store.on("error",()=>{
//   console.log("error in mongo session store,", error);
// });


const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const { param } = require("./routs/alllistings");
const { allow } = require("joi");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,                    // hume humesa yahi key use karni hai 
    api_key:process.env.CLOUDE_API_KEY,
    api_secret:process.env.CLOUDE_API_SECRET

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormat: ["png", "jpg", "jpeg"],
    },
  });

module.exports = {
    cloudinary,
    storage,
}
// is file ko listing =.js k ander use karenge routes wale listings

