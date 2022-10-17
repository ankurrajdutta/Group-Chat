const express=require('express');
const app=express();
const path=require('path');


const user=require('./model/user')
const message=require('./model/message')

const userRoutes=require('./routes/user')

const sequelize=require('./utils/databse')

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use('/user',userRoutes)


user.hasMany(message);
message.belongsTo(user)

sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err)
})


