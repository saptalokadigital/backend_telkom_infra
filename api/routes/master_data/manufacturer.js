const express = require("express");
const router = express.Router();
const ManufacturerController = require("../../controllers/master_data/manufacturer");
const auth = require("../../middleware/auth");

router.post("/", ManufacturerController.postManufacturer);
router.get("/", ManufacturerController.getAllManufacturer);
router.delete("/:_id", ManufacturerController.deleteManufacturer);
router.put("/:_id", ManufacturerController.editManufacturer);

module.exports = router;
