const express = require("express");
const router = express.Router();
const UnitController = require("../../controllers/master_data/unit");
const auth = require("../../middleware/auth");

router.post("/", UnitController.postUnit);
router.get("/", UnitController.getAllUnit);
router.delete("/:_id", UnitController.deleteUnit);
router.put("/:_id", UnitController.editUnit);

module.exports = router;
