const express = require("express");
const router = express.Router();
const spareKitController = require("../controllers/spareKit");

router.get("/data/", spareKitController.getAll);
router.get("/data/:page", spareKitController.getPage);
router.get("/", spareKitController.getKitPopulate);

router.post("/", spareKitController.postSpareKit);
router.delete("/:_id", spareKitController.deleteSpareKit);
router.put("/:_id", spareKitController.editSpareKit);
module.exports = router;
