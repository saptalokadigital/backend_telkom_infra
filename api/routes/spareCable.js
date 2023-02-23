const express = require("express");
const router = express.Router();
const spareCableController = require("../controllers/spareCable");

router.get("/data/", spareCableController.getAll);
router.get("/data/:page", spareCableController.getPage);
router.get("/", spareCableController.getCablePopulate);
module.exports = router;
