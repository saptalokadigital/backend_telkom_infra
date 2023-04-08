const express = require("express");
const router = express.Router();
const loadingController = require("../controllers/loading");
const auth = require("../middleware/auth");

router.post("/cable/:loadingId", loadingController.addCableToLoading);
router.put("/cable/:loadingId", loadingController.editCableInLoading);
router.get("/:loadingId", loadingController.getLoadingById);
router.post("/", loadingController.postLoading);

router.get("/", (req, res) => {
  loadingController
    .getLoading()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/cable/:loadingId", loadingController.removeCableFromLoading);
router.delete("/:_id", loadingController.deleteLoading);

router.post("/kit/:loadingId", loadingController.addKitToLoading);
router.put("/kit/:loadingId", loadingController.editKitInLoading);
router.delete("/kit/:loadingId", loadingController.removeKitFromLoading);

router.delete("/all/:loadingId", loadingController.deleteAllCableAndKitFromLoading);

router.post("/submit/:loadingId", loadingController.loadingSubmittion);

router.get("/turnover/:loadingId", loadingController.getTurnoverByLoadingId);

module.exports = router;
