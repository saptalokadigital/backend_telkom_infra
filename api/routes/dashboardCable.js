const express = require("express");
const router = express.Router();
const dashboardCableController = require("../controllers/dashboardCable");

router.get("/data", dashboardCableController.getAll);
module.exports = router;
