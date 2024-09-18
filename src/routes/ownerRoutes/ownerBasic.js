const express = require("express");
const router = express.Router();
const {userCreateByOwner,ownerSignUp } = require("../../controllers/userAuthentication/ownerWork.js");
// const {userRegistrationSchema , userLoginSchema }= require("../../schemas/userSchemas.js");
// const validateData = require("../../middlewares/validationMiddleware.js");
const authorizeUser = require("../../middlewares/authorizeUser.js");
const createBill = require("../../controllers/Bills/bills.js")
//middleware
const validateBill = require("../../middlewares/validationMiddleware.js")
const validateRole = require("../../middlewares/validationRole.js")
const {BillSchema }= require("../../schemas/userSchemas.js");

// About page route.
router.post("/signup", validateRole('ASER'),ownerSignUp);
router.post("/usercreate", authorizeUser,userCreateByOwner)
router.post("/user/bill/:id",validateBill(BillSchema) , createBill)
module.exports = router;