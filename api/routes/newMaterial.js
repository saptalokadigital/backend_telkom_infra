const express = require("express");
const router = express.Router();
const newMaterialController = require("../controllers/newMaterial");
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
router.post(
  "/addKit/:offloadingId",
  newMaterialController.addKitToOffloadingNewMaterial
);
router.delete(
  "/deleteCable/:offloadingId/:cableId",
  newMaterialController.removeCableFromOffloadingNewMaterial
);
router.delete(
  "/deleteKit/:offloadingId/:kitId",
  newMaterialController.removeKitFromOffloadingNewMaterial
);
router.post(
  "/submit/:offloadingId",
  newMaterialController.offloadingNewMaterialSubmittion
);
router.delete(
  "/delete/:offloadingId",
  newMaterialController.removeOffloadingById
);

module.exports = router;
