const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const offloadingController = require("../controllers/offloadingExisting");

router.get("/", loadingController.getLoading);
router.get("/:loadingId", loadingController.getLoadingById);
// router.post(
//     "/:loadingId/loading/:cableId",
//     offloadingController.offloadingExisting
// );
router.post(
  "/addCableExisting/:loadingId",
  offloadingController.addCableToOffloading
);
router.post(
  "/submitExisting/:loadingId",
  offloadingController.offloadingSubmittion
);

module.exports = router;
