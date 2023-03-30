const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report");
const auth = require("../middleware/auth");

router.get("/", reportController.getReportPopulate);
module.exports = router;
