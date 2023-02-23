const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const auth = require("../middleware/auth");

router.get("/:tank", inventoryController.getTank);

module.exports = router;
