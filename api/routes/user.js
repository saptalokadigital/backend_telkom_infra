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

router.get("/userProfile", auth, userController.userProfile);

router.get("/super-admin", (req, res) => {
  userController
    .getSuperAdmin()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.get("/admin", (req, res) => {
  userController
    .getAdmin()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
