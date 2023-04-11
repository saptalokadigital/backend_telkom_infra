const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report");
const auth = require("../middleware/auth");

router.get("/", reportController.getReportPopulate);
router.get("/spare_kits", reportController.getReportKitsPopulate);
module.exports = router;
