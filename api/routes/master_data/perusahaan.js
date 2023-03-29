const express = require("express");
const router = express.Router();
const PerusahaanController = require("../../controllers/master_data/perusahaan");
const auth = require("../../middleware/auth");

router.post("/create", (req, res) => {
  PerusahaanController.postPerusahaan(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  PerusahaanController.getAllPerusahaan()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
  PerusahaanController.deletePerusahaan(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
  let data = req.body;
  console.log(data);
  PerusahaanController.editPerusahaan(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
