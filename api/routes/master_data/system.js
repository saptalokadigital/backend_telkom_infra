const express = require("express");
const router = express.Router();
const SystemController = require("../../controllers/master_data/system");
const auth = require("../../middleware/auth");
const checkRole = require("../../middleware/multi_roles");

router.post("/create", (req, res) => {
    SystemController.postSystem(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
    SystemController.getAllSystem()
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
    SystemController.deleteSystem(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
    let data = req.body;
    console.log(data);
    SystemController.editSystem(req.params.id, data)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
    SystemController.getSystemById(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

module.exports = router;
