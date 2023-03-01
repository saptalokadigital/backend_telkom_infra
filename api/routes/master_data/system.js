const express = require("express");
const router = express.Router();
const SystemController = require("../../controllers/master_data/system");
const auth = require("../../middleware/auth");

router.post("/", SystemController.postSystem);
router.get("/", SystemController.getAllSystem);
router.delete("/:_id", SystemController.deleteSystem);
router.put("/:_id", SystemController.editSystem);

module.exports = router;
