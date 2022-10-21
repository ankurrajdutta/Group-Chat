const express = require("express");
const app = express();
const path = require("path");

const User = require("./model/user");
const Message = require("./model/message");
const Group = require("./model/group");
const User_group= require("./model/user_group");

const userRoutes = require("./routes/user");
const groupRoutes=require('./routes/group')

const sequelize = require("./utils/databse");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use("/user", userRoutes);
app.use('/group',groupRoutes)

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: User_group });
Group.belongsToMany(User, { through: User_group });

Group.hasMany(Message);
Message.belongsTo(Group);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
