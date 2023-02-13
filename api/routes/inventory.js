const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const auth = require("../middleware/auth");

router.get("/:tank", auth, inventoryController.getTank);

module.exports = router;
