const express = require("express");
const router = express.Router();
const kursController = require("../../controllers/master_data/kurs");

router.post("/create", kursController.createKurs);
router.get("/get", kursController.getKurs);

module.exports = router;
