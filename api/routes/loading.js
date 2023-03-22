const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const auth = require("../middleware/auth");

router.post("/cable", loadingController.addCableToLoading);
router.get("/:loadingId", loadingController.getLoadingById);
router.post("/", loadingController.postLoading);
router.get("/", loadingController.getLoading);
module.exports = router;
