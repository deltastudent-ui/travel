require("dotenv").config(); // ✅ sabse upar

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // ✅ make sure it's defined
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["jpeg", "png", "jpg", "webp", "avif"],
  },
});

module.exports = {
  cloudinary,
  storage,
};
