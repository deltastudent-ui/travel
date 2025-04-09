
const User = require("../models/user");

// signup get 
module.exports.signUpGet = (req,res)=>{
    res.render("users/signup.ejs")
};


/// sign up post
module.exports.SignupPost =   async(req,res, next)=>{    // hume error k liye aisi functionality add karni hai ki agar user allready exixt karta hai to wahi ak msg flash ho aur hum form m hi rahe !
 try{
    let {username, email, password} = req.body;
       const newUser = new User({email, username});
       
       const register =   await  User.register(newUser, password); 

       // jaise hi user signup ho jaye waise hi login bhi kar do for use req.login ();
       
       
       req.login(register,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", `wellcome to Wanderlust! ${username}`);
        // console.log(req.user);
        res.redirect("/listings");
       })
       

      
    // yaha tak hia jaise hi usersignup ho vo autologgin ho jaye ;
    
}catch(err){
    req.flash("error", err.message)
    res.redirect("/signup");
}
};

// login get
module.exports.loginGet = (req,res)=>{
    res.render("users/login.ejs");
};

// login post 
module.exports.loginPost = async (req, res) => {
    req.flash( "success","wellcome back to wonderlust !");

    // login karenge to humare res.locals.redirectUrl isme save nhi hua data isiliye redirect nhi kar paya 
    let localsV = res.locals.redirectUrl || "/listings";  // mean agar agar res.locals.redirectUrl k ander kuxh exixt karta hia to yahi jake localV m save ho jaye nhi to listings jake save ho jaye !
    res.redirect(localsV);
};

// logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
       
            req.flash("success", "You are /logged Out!");
                     
    })
    res.redirect("/listings");
    

    

};