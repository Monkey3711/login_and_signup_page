const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const  app = express();
const signUp_model = require('./sign_data');
const wed_Routes = require("./web_sites_Routes");


dotenv.config({path:"./config.env"});   // to use the enviroment variables

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:false}));  //middleware funtion

app.use('/assets',express.static('assets')) //adding the css,images



app.use("/",wed_Routes);


//connecting to mongoDB

const data_base = process.env.DB.replace('<password>',process.env.DB_PASSWORD); 
mongoose.connect(data_base,{
    useNewUrlParser:true
}).then(con=>{
    console.log('DB is connected');
}).catch(con=>{
    console.log('DB is failed to connect');
})

//routes
// app.get("/SignUp",(req,res)=>{
//   res.render("signup.hbs");
// })
// app.post("/SignUp",async(req,res)=>{
//     const data = {
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//        }
//     const user = await signUp_model.insertMany(data);
//     res.render("login.hbs");
// })

app.listen(1300,()=>{
    console.log("server is running...");
})