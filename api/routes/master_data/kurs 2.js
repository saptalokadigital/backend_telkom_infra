const express = require("express");
const router = express.Router();
const kursController = require("../../controllers/master_data/kurs");
const auth = require("../../middleware/auth");

router.post("/create", kursController.createKurs);
router.get("/get", kursController.getKurs);

module.exports = router;
