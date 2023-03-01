const express = require("express");
const router = express.Router();
const coreTypeController = require("../../controllers/master_data/core_type");
const auth = require("../../middleware/auth");

router.post("/", coreTypeController.postCoreType);
router.get("/", coreTypeController.getAllCoreType);
router.delete("/:_id", coreTypeController.deleteCoreType);
router.put("/:_id", coreTypeController.editCoreType);

module.exports = router;
