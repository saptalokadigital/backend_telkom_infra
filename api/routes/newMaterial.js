const express = require("express");
const router = express.Router();
const newMaterialController = require("../controllers/newMaterial");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

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
  upload.single("evidence"),
  newMaterialController.addCableToOffloadingNewMaterial
);
router.post(
  "/addKit/:offloadingId",
  upload.single("evidence"),
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
router.post(
  "/evidence/:offloadingId",
  upload.single("evidence"),
  newMaterialController.addEvidenceToNewMaterial
);

router.get("/evidence/:offloadingId", newMaterialController.downloadFile);

router.post(
  "/evidence/cable/:offloadingId/:cableId",
  upload.single("evidence"),
  newMaterialController.addEvidenceToCableNewMaterial
);

router.post(
  "/evidence/kit/:offloadingId/:kitId",
  upload.single("evidence"),
  newMaterialController.addEvidenceToKitNewMaterial
);

router.get(
  "/evidence/cable/:offloadingId/:cableId",
  newMaterialController.downloadFileCable
);

router.get(
  "/evidence/kit/:offloadingId/:kitId",
  newMaterialController.downloadFileKit
);

router.post("/status/:id",newMaterialController.approveNewMaterial)

module.exports = router;
