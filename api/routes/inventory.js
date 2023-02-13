const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const auth = require("../middleware/auth");

//Sign up URL
router.get("/signup", userController.signUpNewUser);

module.exports = router;
