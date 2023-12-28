const express = require("express");
const router = express.Router();
const settingController = require("../controllers/setting");

router.put("/:id", settingController.updateUser);
router.get("/", settingController.getUser);
module.exports = router;
