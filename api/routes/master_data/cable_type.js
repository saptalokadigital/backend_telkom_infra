const express = require("express");
const router = express.Router();
const CableTypeController = require("../../controllers/master_data/cable_type");

router.post("/create", (req, res) => {
  CableTypeController.postCableType(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  CableTypeController.getAllCableType()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  CableTypeController.deleteCableType(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  CableTypeController.editCableType(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
  CableTypeController.getCableTypeById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
