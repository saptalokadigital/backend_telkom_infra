const express = require("express");
const router = express.Router();
const userRoutes = require("./user");

const spareCableRoutes = require("./spareCable");
const spareKitRoutes = require("./spareKit");

const inventoryRoutes = require("./inventory");
const loadingRoutes = require("./loading");
const cableTypeRoutes = require("./master_data/cable_type");
const coreTypeRoutes = require("./master_data/core_type");
const manufacturerRoutes = require("./master_data/manufacturer");
const armoringTypeRoutes = require("./master_data/armoring_type");
const systemRoutes = require("./master_data/system");
const perusahaanRoutes = require("./master_data/perusahaan");
const locationRoutes = require("./master_data/location");
const unitRoutes = require("./master_data/unit");
const settingRoutes = require("./setting");
const cartRoutes = require("./cart");
const updatingSpareCableRoutes = require("./updateSpareCable");
const offloadingRoutes = require("./offloading");
const reportRoutes = require("./report");
const spareCableNewMaterialRoutes = require("./newMaterial");
const dashboardRoutes = require("./dashboard");
const kursRouter = require("./master_data/kurs");

router.use("/user", userRoutes);
router.use("/spareCable", spareCableRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/loading", loadingRoutes);
router.use("/cableType", cableTypeRoutes);
router.use("/coreType", coreTypeRoutes);
router.use("/manufacturer", manufacturerRoutes);
router.use("/armoringType", armoringTypeRoutes);
router.use("/system", systemRoutes);

router.use("/spareKit", spareKitRoutes);
router.use("/perusahaan", perusahaanRoutes);
router.use("/location", locationRoutes);
router.use("/unit", unitRoutes);
router.use("/setting", settingRoutes);
router.use("/cart", cartRoutes);
router.use("/updatingSpareCable", updatingSpareCableRoutes);
router.use("/loading", loadingRoutes);
router.use("/offloading", offloadingRoutes);
router.use("/report", reportRoutes);
router.use("/offloadingNewMaterial", spareCableNewMaterialRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/kurs", kursRouter);

module.exports = router;
