const router = require("express").Router()
const chartController = require("../controllers/chart")

router.get("/loadingAndMaterial", chartController.chartLoadingAndNewMaterial)
router.get("/occupancy", chartController.chartOccupancy)
router.get("/spareKit", chartController.chartSpareKit)

module.exports = router