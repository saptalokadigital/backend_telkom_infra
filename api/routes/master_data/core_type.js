const express = require("express");
const router = express.Router();
const CoreTypeController = require("../../controllers/master_data/core_type");

router.post("/create", (req, res) => {
  CoreTypeController.postCoreType(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  CoreTypeController.getAllCoreType()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  CoreTypeController.deleteCoreType(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  CoreTypeController.editCoreType(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
  CoreTypeController.getCoreTypeById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
