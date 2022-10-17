const express = require("express");
const router = express.Router();

const userController = require("../Controller/user");

router.post("/", userController.addUser);

module.exports = router;
