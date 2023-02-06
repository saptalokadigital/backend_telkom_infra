const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//Sign up URL
router.post("/signup", userController.signUpNewUser);

//Sign in URL
router.post("/signin", userController.userSignIn);

//Delete user
router.delete("/:userId", userController.deleteUser);

module.exports = router;
