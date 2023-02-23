const express = require("express");
const router = express.Router();
const dashboardCableController = require("../controllers/dashboardCable");

router.get("/data/", dashboardCableController.getAll);
router.get("/data/:page", dashboardCableController.getPage);
router.get("/", dashboardCableController.getCablePopulate);
module.exports = router;
