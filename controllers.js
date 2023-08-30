const signUp_model = require("./sign_data");
const jwt = require("jsonwebtoken");
const {promisify}= require("util");

const signToken = id=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


exports.SignUp_data = async(req,res)=>{
    const data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
       }
    const user = await signUp_model.insertMany(data);

    let token = signToken(user._id);
    
    // res.status(200).json({
    //     status: 'success',
    //     token,
    //     data:{
    //        user
    //     }
    // }) 
    
    res.render("login.hbs");
}
exports.SignUp_page = (req,res)=>{
    res.render('signup.hbs');
}
exports.login = async(req,res)=>{
    res.render('login.hbs');
}
exports.home = async(req,res)=>{
    res.render('home.hbs');
}

exports.check_Users = async(req,res)=>{
    const user_email = await signUp_model.findOne({email:req.body.email});
    const user_password = await signUp_model.findOne({password:req.body.password});
    console.log(user_email);
    if(!user_email || !user_password){
       res.status(404).json({
        status :"failed",
        message :"could not find such email or password"
       })
    }
    if(user_email && user_password){
        res.render("home.hbs");
    }
}
exports.protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      return res.status(500).json({
        status:"failed",
        message:"the token is wrong"
      })
    }
    //2.verification token
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded)
    next();
};
