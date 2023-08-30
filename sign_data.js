const mongoose = require("mongoose");

const signUp_schema = new mongoose.Schema({
    name:{
        type:String,
       // required:[true,"the name is require"]
    },
    email:{
        type:String,
       // required:[true,"an email is require"]
    },
    password:{
        type:String,
       // required:[true,"a password is require"]
    }
})

const sigUp_model = mongoose.model("SignUp",signUp_schema);

module.exports = sigUp_model;