const express = require("express");
const router = express.Router();
const ManufacturerController = require("../../controllers/master_data/manufacturer");

router.post("/create", (req, res) => {
  ManufacturerController.postManufacturer(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  ManufacturerController.getAllManufacturer()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  ManufacturerController.deleteManufacturer(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  ManufacturerController.editManufacturer(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
  ManufacturerController.getManufacturerById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
module.exports = router;
