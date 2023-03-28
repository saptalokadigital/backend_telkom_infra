const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const auth = require("../middleware/auth");

router.get("/", loadingController.getLoading);
router.get("/:loadingId", loadingController.getLoadingById);

module.exports = router;
