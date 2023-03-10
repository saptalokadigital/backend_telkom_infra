const express = require("express");
const router = express.Router();
const LocationController = require("../../controllers/master_data/location");
const auth = require("../../middleware/auth");

router.post("/", LocationController.postLocation);
router.get("/", LocationController.getAllLocation);
router.delete("/:_id", LocationController.deleteLocation);
router.put("/:_id", LocationController.editLocation);

module.exports = router;
