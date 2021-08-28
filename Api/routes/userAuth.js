const express = require("express");
const router = express.Router();
const signUpModel = require("../controller/SignUp");
const signInModel = require("../controller/SignIn")
const auth = require("../middleware/auth")
// check_userName
router.get("/signup/:username", signUpModel.userNameCheck);
// register
router.post("/signup", signUpModel.register);
// login
router.post("/signin",signInModel.login)

router.get('/userProfile',auth,signInModel.getData)
module.exports = router;
