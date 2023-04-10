const express = require("express");
const router = express.Router();
const spareKitController = require("../controllers/spareKit");

router.get("/data/", spareKitController.getAll);
router.get("/data/:page", spareKitController.getPage);
// router.get("/", spareKitController.getKitPopulate);
router.get("/", (req, res) => {
  spareKitController
    .getKitPopulate()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
// router.post("/", spareKitController.postSpareKit);
router.post("/create", (req, res) => {
  spareKitController
    .postSpareKit(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.delete("/:_id", spareKitController.deleteSpareKit);
router.put("/:_id", spareKitController.editSpareKit);
module.exports = router;
