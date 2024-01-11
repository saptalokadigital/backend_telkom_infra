const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");

//Sign up URL
router.post("/signup", userController.signUpNewUser);

//Sign in URL
router.post("/signin", userController.userSignIn);

//Delete user
router.delete("/:userId", userController.deleteUser);

router.get("/validate", auth, userController.validate);

router.post("/logout",auth,userController.logout)

router.get("/userProfile", auth, userController.userProfile);

router.get("/data", userController.getAll);
module.exports = router;
