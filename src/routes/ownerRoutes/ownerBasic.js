const express = require("express");
const router = express.Router();
const {userCreateByOwner,ownerSignUp } = require("../../controllers/userAuthentication/ownerWork.js");
// const {userRegistrationSchema , userLoginSchema }= require("../../schemas/userSchemas.js");
// const validateData = require("../../middlewares/validationMiddleware.js");
const authorizeUser = require("../../middlewares/authorizeUser.js");


// About page route.
router.post("/signup", ownerSignUp);
router.post("/usercreate", authorizeUser,userCreateByOwner)
module.exports = router;