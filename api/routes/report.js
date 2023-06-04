const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report");
router.get("/", reportController.getReportPopulate);
router.get("/spare_kits", reportController.getReportKitsPopulate);
module.exports = router;
