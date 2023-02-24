const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const auth = require("../middleware/auth");

router.post("/", loadingController.postLoading);
router.get("/:loadingId", loadingController.getLoadingById);

module.exports = router;
