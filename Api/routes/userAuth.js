const express = require("express");
const router = express.Router();
const signUpModel = require("../controller/SignUp");
const signInModel = require("../controller/SignIn")
// check_userName
router.get("/signup/:username", signUpModel.userNameCheck);
// register
router.post("/signup", signUpModel.register);
// login
router.post("/signin",signInModel.login)

module.exports = router;
