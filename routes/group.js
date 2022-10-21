const express = require("express");
const router = express.Router();

const groupController=require('../Controller/group');

const authorizationMWare = require("../middleware/authentication");

router.post('/addGroup',authorizationMWare.authorization,groupController.addGroup);
router.get(
  "/getAllGroup",
  authorizationMWare.authorization,groupController.getAllGroup
);
router.post("/addUserGroup", groupController.addUserGroup);

module.exports=router;