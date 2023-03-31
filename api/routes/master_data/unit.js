const express = require("express");
const router = express.Router();
const UnitController = require("../../controllers/master_data/unit");
const auth = require("../../middleware/auth");

router.post("/create", (req, res) => {
  UnitController.postUnit(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  UnitController.getAllUnit()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  UnitController.deleteUnit(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  UnitController.editUnit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
