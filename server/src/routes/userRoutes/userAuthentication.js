const express = require("express");
const router = express.Router();
const { homeRoute, signUp,signIn, verifyOtp } = require("../../controllers/userAuthentication/userAuthentication.js");
const {userRegistrationSchema , userLoginSchema }= require("../../schemas/userSchemas.js");
const validateData = require("../../middlewares/validationMiddleware.js");
const authorizeUser = require("../../middlewares/authorizeUser.js");

// Home page route.
router.get("/", homeRoute);

// About page route.
router.post("/signup", validateData(userRegistrationSchema), signUp);
router.post("/signin", validateData(userLoginSchema), signIn);
router.post("/verifyotp", verifyOtp);
// router.post("/test",authorizeUser,getAllUsers)
module.exports = router;
