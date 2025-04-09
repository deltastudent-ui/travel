const mongoose = require('mongoose');
const reviews = require('./reviews');
const { types, ref, string } = require('joi');
const review = require("./reviews.js");
const User = require("./user.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description: {
      type:  String,
    },
    image:{
        url:String,
        filename:String,
    },
    price: Number,
    location : String,
    country: String,

    // review schema for take a indivisual listings 
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],

});

listingSchema.post("findOneAndDelete",async (data)=>{

 if(data){
    await review.deleteMany({_id:{$in: data.reviews}});
 }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;