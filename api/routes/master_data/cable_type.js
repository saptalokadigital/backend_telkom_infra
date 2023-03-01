const express = require("express");
const router = express.Router();
const cableTypeController = require("../../controllers/master_data/cable_type");
const auth = require("../../middleware/auth");

router.post("/", cableTypeController.postCableType);
router.get("/", cableTypeController.getAllCableType);
router.delete("/:_id", cableTypeController.deleteCableType);
router.put("/:_id", cableTypeController.editCableType);

module.exports = router;
