require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 1000;
const mongoose = require("mongoose");

const cors = require("cors");

const userRoutes = require("./api/routes/user");
const spareCable = require("./api/models/spare_cable.models");
const spareKit = require("./api/models/spare_kits");

const spareCableRoutes = require("./api/routes/spareCable");
const spareKitRoutes = require("./api/routes/spareKit");

const inventoryRoutes = require("./api/routes/inventory");
const loadingRoutes = require("./api/routes/loading");
const cableTypeRoutes = require("./api/routes/master_data/cable_type");
const coreTypeRoutes = require("./api/routes/master_data/core_type");
const manufacturerRoutes = require("./api/routes/master_data/manufacturer");
const armoringTypeRoutes = require("./api/routes/master_data/armoring_type");
const systemRoutes = require("./api/routes/master_data/system");
const perusahaanRoutes = require("./api/routes/master_data/perusahaan");
const locationRoutes = require("./api/routes/master_data/location");
const unitRoutes = require("./api/routes/master_data/unit");
const settingRoutes = require("./api/routes/setting");
const cartRoutes = require("./api/routes/cart");
const updatingSpareCableRoutes = require("./api/routes/updateSpareCable");
const offloadingRoutes = require("./api/routes/offloading");
const reportRoutes = require("./api/routes/report");
const spareCableNewMaterialRoutes = require("./api/routes/newMaterial");
const dashboardRoutes = require("./api/routes/dashboard");
const kursRouter = require("./api/routes/master_data/kurs");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.use(cors());

app.use(express.json());

// add spare cable
// app.get("/add-spareCable", (req, res) => {
//   const spare_cable = new spareCable({
//     no: "223",
//     depo_location: "woyy",
//     label_id: "wkwk",
//     system: "wkwk",
//     cable_type: "wkwk",
//     manufacturer: "wkwk",
//     armoring_type: "wkwkkwk",
//     core_type: "wkwk",
//     Σ_CORE: "wkwk",
//     length_report_meter: "wkwk",
//     length_meas_meter: "wkwk",
//     doc_reff: "wkwk",
//     tank_inner: "wkwk",
//     tank_outter: "wkwk",
//     tank_level: "wkwk",
//     remark: "wkwk",
//     keterangan: "wkwk",
//     tanggal_validasi: "wkwk",
//     status_validasi: "wkwk",
//     tanggal_transaksi: "wkwk",
//     aktivitas_transaksi: "wkwk",
//     from_to: "wkwk",
//     nomor_berita_acara: "wkwk",
//   });
//   spare_cable
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// get all spare cables
app.get("/all-spareCables", (req, res) => {
  spareCable
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add spare kits
// app.get("/add-spareKits", (req, res) => {
//   const spare_Kit = new spareKit({
//     no: "1700",
//     lokasi: "",
//     nomor_rak: "",
//     nama_barang: "",
//     part_number: "",
//     serial_number: "",
//     system: "",
//     weight: "",
//     qty: "",
//     unit: "",
//     keterangan: "",
//     tanggal_transaksi: "",
//     aktivitas_transaksi: "",
//     from_to: "",
//     nomor_berita_acara: "",
//   });
//   spare_Kit
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// get all spare kit
app.get("/all-spareKits", (req, res) => {
  spareKit
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/spareCable", spareCableRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/loading", loadingRoutes);
app.use("/api/cableType", cableTypeRoutes);
app.use("/api/coreType", coreTypeRoutes);
app.use("/api/manufacturer", manufacturerRoutes);
app.use("/api/armoringType", armoringTypeRoutes);
app.use("/api/system", systemRoutes);

app.use("/api/spareKit", spareKitRoutes);
app.use("/api/perusahaan", perusahaanRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/unit", unitRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/updatingSpareCable", updatingSpareCableRoutes);
app.use("/api/loading", loadingRoutes);
app.use("/api/offloading", offloadingRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/spareCableNewMaterial", spareCableNewMaterialRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/kurs", kursRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
module.exports = app;
