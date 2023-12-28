// const express = require("express");
// const router = express.Router();
// const newMaterialController = require("../controllers/newMaterial");
// const auth = require("../middleware/auth");
// const multer = require("multer");

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// // newMaterial

// router.post("/", auth, newMaterialController.postSpareCableNewMaterial);
// router.get("/", auth, newMaterialController.getCartCablesNewMaterial);
// router.delete("/:id", auth, newMaterialController.deleteCartCablesNewMaterial);
// router.delete("/", auth, newMaterialController.deleteAllCartCablesNewMaterial);
// router.put("/:id", auth, newMaterialController.editCartCablesNewMaterial);
// router.get("/submit", auth, newMaterialController.submitCartCablesNewMaterial);

// router.get("/all", newMaterialController.getAllSpareCableNewMaterial);

// router.get("/:_id", newMaterialController.getSpareCableNewMaterialById);
// router.post(
//   "/evidence/:loadingId",
//   upload.single("evidence"),
//   newMaterialController.uploadEvidenceSpareCableNewMaterial
// );

// router.get(
//   "/evidence/:loadingId",
//   newMaterialController.downloadEvidenceSpareCableNewMaterial
// );
// module.exports = router;
