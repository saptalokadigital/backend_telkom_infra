const express = require("express");
const router = express.Router();
const updateAllDataDateInCollectionSpareCable = require("../controllers/updatingSpareCable");

router.get(
    "/updateAllDataDateInCollectionSpareCable",
    updateAllDataDateInCollectionSpareCable.updateAllDataDateInCollectionSpareCable
);
module.exports = router;
