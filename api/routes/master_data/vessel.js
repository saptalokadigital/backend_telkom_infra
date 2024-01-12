const express = require("express");
const router = express.Router();
const VesselController = require("../../controllers/master_data/core_type");

router.post("/create", (req, res) => {
  VesselController.postVessel(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  VesselController.getAllVessel()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  VesselController.deleteVessel(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  VesselController.editVessel(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
  VesselController.getVesselById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
