const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const offloadingController = require("../controllers/offloading");
const auth = require("../middleware/auth");

router.get("/", loadingController.getLoading);
router.get("/:loadingId", loadingController.getLoadingById);
router.post(
    "/:loadingId/loading/:cableId",
    offloadingController.offloadingExisting
);
module.exports = router;
