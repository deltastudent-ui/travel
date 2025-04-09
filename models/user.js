const { required, string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const { schema } = require("./reviews");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },                           //passportLocalMongoose humare liye khud hi username password ko add kar dega
                                // salt vallue bhi add kar dega 
                                //khud hi password ko hased kar dega
}); 

 userSchema.plugin(passportLocalMongoose); 

 module.exports = mongoose.model("User", userSchema);