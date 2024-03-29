const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/chart", dashboardController.getChart);
router.get(
  "/chart/:cable_type/:armoring_type",
  dashboardController.getChartByCableTypeAndArmoringType
);
router.get("/chart/cable_type", dashboardController.getChartByCableType);
// router.get("/spare_kits", dashboardController.getdashboardKitsPopulate);
module.exports = router;
