const express = require("express");
const router = express.Router();
const newMaterialController = require("../controllers/newMaterial");
const auth = require("../middleware/auth");

// newMaterial

router.post("/", auth, newMaterialController.postSpareCableNewMaterial);
router.get("/", auth, newMaterialController.getCartCablesNewMaterial);
router.delete("/:id", auth, newMaterialController.deleteCartCablesNewMaterial);
router.delete("/", auth, newMaterialController.deleteAllCartCablesNewMaterial);
router.put("/:id", auth, newMaterialController.editCartCablesNewMaterial);
router.get("/submit", auth, newMaterialController.submitCartCablesNewMaterial);

module.exports = router;
