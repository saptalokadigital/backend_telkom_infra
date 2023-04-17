const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const auth = require("../middleware/auth");

router.get("/chart", dashboardController.getChart);
// router.get("/spare_kits", dashboardController.getdashboardKitsPopulate);
module.exports = router;
