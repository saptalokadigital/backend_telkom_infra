const express = require("express");
const router = express.Router();
const LocationController = require("../../controllers/master_data/location");
const auth = require("../../middleware/auth");

router.post("/create", (req, res) => {
  LocationController.postLocation(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  LocationController.getAllLocation()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  LocationController.deleteLocation(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  LocationController.editLocation(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
