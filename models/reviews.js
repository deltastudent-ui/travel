// const { required } = require("joi");
// const mongoose = require("mongoose");
// let Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//     comment: {
//         type:String,
//         required: true,
//     },
//     rating: {
//         type:Number, 
//         min: 1,
//         max: 5,
//     }, 
//     createdAt:{
//         type: Date,
//         default: Date.now()
//     }
// });
// module.exports = mongoose.model("Review",reviewSchema);

const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const reviewSchema = new Schema ({
    comment: String,
    rating :{
        type:Number,
        min:1,
        max:5
    },
    createdAt :{
        type:Date,
        default:Date.now()
    },
    auther:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

module.exports=mongoose.model("Review",reviewSchema);