const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory");
const auth = require("../middleware/auth");

router.get("/cable/:tank", inventoryController.getTank);
router.get("/kit/:tank", inventoryController.getTankKits);

module.exports = router;
