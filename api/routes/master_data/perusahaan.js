const express = require("express");
const router = express.Router();
const perusahaanController = require("../../controllers/master_data/perusahaan");
const auth = require("../../middleware/auth");

router.post("/", perusahaanController.postPerusahaan);
router.get("/", perusahaanController.getAllPerusahaan);
router.delete("/:_id", perusahaanController.deletePerusahaan);
router.put("/:_id", perusahaanController.editPerusahaan);

module.exports = router;
