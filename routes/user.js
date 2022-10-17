const express = require("express");
const router = express.Router();

const userController = require("../Controller/user");

router.post("/signUp", userController.addUser);
router.post('/login',userController.login)

module.exports = router;
