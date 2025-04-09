const Listing = require("../models/listing");

 module.exports.index =  async (req, res)=>{
    const allListing =  await Listing.find({})
    res.render("listings/index.ejs",{allListing}); // listings is a folder and isme sab kuch ejs ka file hai so 
   };

   // new  post routes
module.exports.renderNewForm =  (req,res)=>{
    console.log(req.user);  // isase jo logged in ka info aake isme save hota  hai  !
    res.render("listings/new.ejs");
    };

    // post routes
  module.exports.postRoutes=   async(req,res, next)=>{
  
  
        // for asin the joischema ---
      
        // let result = listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //   throw new expressError(404, result.error);
        // }  // for asin the joischema ---
        console.log(req.body);
        
        // let url = req.file.path;
        // let filename = req.file.filename
        const list = new Listing(req.body.listing);  
           list.owner = req.user._id;  // jab bhi hum koi new user create Karenge  tab us user ka name jake show rout p dikhna chahiye
           const img = req.body?.listing?.image;
           console.log(req.body?.listing?.image);
           
           const filename = "file";
         list.image = { url : img, filename};
         console.log(list);
         
           await list.save();
          req.flash("success", "New listing create"); // jaise hi new listing create ho waise hi msg aa jaye 
          res.redirect("/listings");
        
        
      };

      // show routes

      module.exports.showRoutes = async (req, res)=>{
        let {id} = req.params;
        const findData = await Listing.findById(id).populate({path:"reviews",populate:{path:"auther"},}); // reviews mean listing ka schema hai reviews k liye ye popolate karna pada
        if(!findData){        // jis listing ko hum delete kar diye hai us listing ko agar hum phir se request bhejenge usi path p to vo hume ye eror dikhayega aur listings p redirect kar dega 
    
          req.flash("error", "Listings you requested for does not exixt "); 
          res.redirect("/listings");
        }
        console.log(findData.owner);
        
        res.render("listings/show.ejs",{findData});
      
      };

      // edit routes ka get 
      module.exports.editGet = async(req,res)=>{
        let {id}= req.params;
        const findData = await  Listing.findById(id);
        // that is called failer // ye bhi wahi karta hai agar jis listings ko delete kar diye hai usko phir se usi path p req bheja ja raha hai to vo ye error thrw karega 
        if(!findData){
          req.flash("error", "Listings you requested for does not exixt ");
          res.redirect("/listings");
        }
        let originalImage =   findData.image.url;
        originalImage = originalImage.replace("/upload", "/upload/c_scale,h_200,w_200");
        res.render("listings/edit.ejs" ,{findData, originalImage}); 
      };
      // edit ka put rout
      module.exports.editPut = async(req,res)=>{
        
        let {id} = req.params;
    
        let listing =  await Listing.findByIdAndUpdate(id, {...req.body.listing});
        if(typeof req.file !== "undefined"){  // agar req,file m url filename exixt karta hai tabhi to ise excute karayege nhi to nhi // typeof mean y chaek karta hai ki kya humare variable ki value undifind hai
        let url = req.file.path;
        let filename = req.file.filename  // ye dono img ki url aur filename nikalega
        listing.image = {url,filename};
        await listing.save();
        }
      
        req.flash("success", "Listings Updated!");
        res.redirect(`/listings/${id}`);

      
      };

      // delete routes 
      module.exports.delteRoutes = async(req,res)=>{
        let {id} = req.params;
      let delted =  await Listing.findByIdAndDelete(id , {new: true});
        req.flash("success", "Listing deleted");  
       console.log(delted);
       res.redirect("/listings");
      };
      module.exports.search =  async (req, res) => {
        const query = req.query?.country || "";
        try {
          const listings = await Listing.find({
            country: { $regex: query, $options: "i" }, // Case-insensitive search
          });
          res.render("listings/search.ejs", { listings });
        } catch (err) {
          console.error(err);
          res.status(500).send("Error fetching listings");
        }
        };
        
