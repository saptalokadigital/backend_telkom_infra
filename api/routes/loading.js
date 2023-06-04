const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post("/cable/:loadingId", loadingController.addCableToLoading);
router.put("/cable/:loadingId", loadingController.editCableInLoading);
router.get("/:loadingId", loadingController.getLoadingById);
router.post("/", loadingController.postLoading);
router.get("/", loadingController.getLoading);

router.delete("/cable/:loadingId", loadingController.removeCableFromLoading);
router.delete("/:_id", loadingController.deleteLoading);

router.post("/kit/:loadingId", loadingController.addKitToLoading);
router.put("/kit/:loadingId", loadingController.editKitInLoading);
router.delete("/kit/:loadingId", loadingController.removeKitFromLoading);

router.delete(
  "/all/:loadingId",
  loadingController.deleteAllCableAndKitFromLoading
);

router.post("/submit/:loadingId", loadingController.loadingSubmittion);

router.get("/turnover/:loadingId", loadingController.getTurnoverByLoadingId);

router.post(
  "/evidence/:loadingId",
  upload.single("evidence"),
  loadingController.addEvidenceToLoading
);

router.get("/evidence/:loadingId", loadingController.downloadFile);

module.exports = router;
