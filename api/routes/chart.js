const router = require("express").Router()
const chartController = require("../controllers/chart")

router.get("/loadingAndMaterial/:id?",chartLoadingAndNewMaterial)

module.exports = router