const express = require("express");
const router = express.Router();
const kursController = require("../../controllers/master_data/kurs");
const auth = require("../../middleware/auth");

router.post("/create", kursController.createKurs);
router.put("/edit", kursController.editKurs);

module.exports = router;
