const express = require("express");
const router = express.Router();
const authController = require("../../Controller/AuthController");

router.get("/userinfo", authController.UserInfo);

router.post("/register", authController.Signup);
router.post("/login", authController.Login);

module.exports = router;
