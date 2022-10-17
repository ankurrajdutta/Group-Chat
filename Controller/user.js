const user=require('../model/user');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.addUser=async(req,res,next)=>{
 
        const {userName,userEmail,userPhoneNumber,userPassword}=req.body;
        console.log(req.body)
        bcrypt.hash(userPassword, saltRounds).then(function (hash) {
        return  user.create({
            name:userName,
            email:userEmail,
            phoneNumber:+userPhoneNumber,
            password:hash
        })
        }).then(result=>{
            res.status(200).json({message:"USER CREATED"})
        }).catch(err=>{
            console.log(err);
            res.status(404).json({message:"USER ALREADY EXISTS"})   
        });

 }

 function generateWebToken(id){
    return jwt.sign({ userId: id }, "shhhhh");
 }

 exports.login=(req,res,next)=>{
     const {userEmail,userPassword}=req.body;
    
     user.findOne({
         where:{
             email:userEmail
         }
     }).then(result=>{
       bcrypt.compare(userPassword, result.password, function (err, pwdResult) {
         if(pwdResult==true){
              res.status(200).json({message:"User Logged in successfully",token:generateWebToken(result.id)});
         }else
         {
             res.status(401).json({
                 message:"Wrong Password"
             })
         }
       });
     }).catch(err=>{
         console.log(err);
         res.status(404).json({message:"User Not Found"})
     })
 }