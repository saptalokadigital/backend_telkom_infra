const express = require("express");
const router = express.Router();
const newMaterialController = require("../controllers/newMaterial");
const auth = require("../middleware/auth");
const multer = require("multer");

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

router.post("/create", newMaterialController.createLoadingNewMaterial);
// router.post(
//   "/addCable/:offloadingId",
//   newMaterialController.addCableNewMaterial
// );
router.get("/all", newMaterialController.getAllOffloadingNewMaterial);
router.get(
  "/:offloadingId",
  newMaterialController.getOffloadingNewMaterialById
);
router.post(
  "/addCable/:offloadingId",
  newMaterialController.addCableToOffloadingNewMaterial
);

module.exports = router;
