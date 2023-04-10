const express = require("express");
const router = express.Router();
const spareCableController = require("../controllers/spareCable");

router.get("/data/", (req, res) => {
  spareCableController
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
router.get("/data/:page", spareCableController.getPage);
router.get("/", (req, res) => {
  spareCableController
    .getCablePopulate()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// router.post("/create", (req, res) => {
//   spareCableController
//     .postSpareCable(req.body)
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });
router.post("/create", spareCableController.createSpareCable);
router.delete("/:_id", spareCableController.deleteSpareCable);
router.put("/:_id", spareCableController.editSpareCable);
router.put("/move/:_id", spareCableController.moveSpareCable);
module.exports = router;
