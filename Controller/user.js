const user=require('../model/user');
const bcrypt = require("bcrypt");
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
            res.status(400).json({message:"USER ALREADY EXISTS"})   
        });

 }