//requiring the joi 
const joi = require("joi");

  module.exports.listingSchema = joi.object({  // is listingschema ko aise hi export karna hai 
    listing:joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price: joi.number().required().min(0),
        image:joi.string().allow("", null),

    }).required(),
    

});

// for reviews validation


const Joi = require('joi');

// module.exports.reviewschema = Joi.object({
//   rating: Joi.number().required().min(1).max(5),
//   comment: Joi.string().required(),
// });



module.exports.reviewschema = Joi.object({
  review: Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
  }).required(),
});

