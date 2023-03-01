const express = require("express");
const router = express.Router();
const armoringTypeController = require("../../controllers/master_data/armoring_type");
const auth = require("../../middleware/auth");

router.post("/", armoringTypeController.postArmoringType);
router.get("/", armoringTypeController.getAllArmoringType);
router.delete("/:_id", armoringTypeController.deleteArmoringType);
router.put("/:_id", armoringTypeController.editArmoringType);

module.exports = router;
