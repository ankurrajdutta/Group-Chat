const Group=require('../model/group');
const User=require('../model/user');
const User_group=require('../model/user_group');
const Message=require('../model/message')

exports.addGroup=(req,res,next)=>{
    let groupName=req.body.groupName
    req.user.createGroup({
        name:groupName,
        createdBy:req.user.name
    }).then(result=>{
        console.log(result.id)
        return Message.create({
            messageText:"JOINED",
            name:req.user.name,
            GroupId:result.id
        })
        
    }).then(result1=>{
        res.status(200).json(result1);
    }).catch(err=>{
        res.status(400).json({ message: "something went wrong" });
        console.log(err);
    })
}

exports.getAllGroup=(req,res,next)=>{
    User.findOne({
        where:{
            email:req.user.email
        }
    }).then(user=>{
       
        return user.getGroups()
    }).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        console.log(err)
    })
}

exports.addUserGroup=(req,res,next)=>{
    let inputEmail=req.body.inputEmail;
    let groupName=req.body.groupName;
    let UserRes,GroupRes;
    console.log(req.body);
    User.findOne({
      where: {
        email: inputEmail,
      }
    }).then(user=>{
        UserRes=user;
        return Group.findOne({
            where:{
                name:groupName
            }
        })
    }).then(group=>{
        GroupRes=group;
        return User_group.create({
            UserId:UserRes.id,
            GroupId:GroupRes.id
        })
    }).then(result=>{
        res.status(200).json({message:"user added successfully"})
    }).catch(err=>{
        
        if (err.name == "SequelizeUniqueConstraintError")
          res.status(401).json({ message: "User already added" });
        else
          res.status(404).json({message:"User not present"})
    })
}