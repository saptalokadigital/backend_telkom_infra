const express = require("express");
const router = express.Router();
const spareCableController = require("../controllers/spareCable");

router.get("/data/", spareCableController.getAll);
router.get("/data/:page", spareCableController.getPage);
router.get("/", spareCableController.getCablePopulate);

router.post("/create", (req, res) => {
  spareCableController
    .postSpareCable(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.post("/", spareCableController.createSpareCable);
router.delete("/:_id", spareCableController.deleteSpareCable);
router.put("/:_id", spareCableController.editSpareCable);
router.put("/move/:_id", spareCableController.moveSpareCable);
module.exports = router;
