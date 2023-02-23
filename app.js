require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/telkominfra";

const userRoutes = require("./api/routes/user");
const spareCable = require("./api/models/spare_cable");
const spareKit = require("./api/models/spare_kits");
const Manufacturer = require("./api/models/manufacturer");
const ArmoringType = require("./api/models/armoring_type");
const CableType = require("./api/models/cable_type");
const CoreType = require("./api/models/core_type");
const System = require("./api/models/system");

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Berhasil Connect Ke Database");
  })
  .catch((e) => {
    console.log(e);
    console.log("Gagal Connect Ke Database");
  });

app.use(express.json());

// SYSTEM
//POST System
app.post("/createSystem", async (req, res) => {
  let data = new System(req.body);
  const result = await data.save();
  res.send(result);
});

// GET all System
app.get("/listSystem", async (req, res) => {
  let data = await System.find();
  res.send(data);
});

// DELETE System
app.delete("/deleteSystem/:_id", async (req, res) => {
  console.log(req.params);
  let data = await System.deleteOne(req.params);

  res.send(data);
});

// PUT System
app.put("/updateSystem/:_id", async (req, res) => {
  console.log(req.params);
  let data = await System.updateOne(req.params, { $set: req.body });
  res.send(data);
});

//CORE TYPE
//POST core type
app.post("/createCoreType", async (req, res) => {
  let data = new CoreType(req.body);
  const result = await data.save();
  res.send(result);
});

// GET all Core_type
app.get("/listCoreType", async (req, res) => {
  let data = await CoreType.find();
  res.send(data);
});

// DELETE Core_type
app.delete("/deleteCoreType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await CoreType.deleteOne(req.params);

  res.send(data);
});

// PUT Core_type
app.put("/updateCoreType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await CoreType.updateOne(req.params, { $set: req.body });
  res.send(data);
});

//CABLE TYPE
// POST cable type
app.post("/createCableType", async (req, res) => {
  let data = new CableType(req.body);
  const result = await data.save();
  res.send(result);
});

// GET all Cable_type
app.get("/listCableType", async (req, res) => {
  let data = await CableType.find();
  res.send(data);
});

// DELETE Cable_type
app.delete("/deleteCableType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await CableType.deleteOne(req.params);

  res.send(data);
});

// PUT Cable_type
app.put("/updateCableType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await CableType.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// ARMORING TYPE
// POST armoring_type
app.post("/createArmoringType", async (req, res) => {
  let data = new ArmoringType(req.body);
  const result = await data.save();
  res.send(result);
});

// GET all armoring_type
app.get("/listArmoringType", async (req, res) => {
  let data = await ArmoringType.find();
  res.send(data);
});

// DELETE armoring_type
app.delete("/deleteArmoringType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await ArmoringType.deleteOne(req.params);

  res.send(data);
});

// PUT armoring_type
app.put("/updateArmoringType/:_id", async (req, res) => {
  console.log(req.params);
  let data = await ArmoringType.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// MANUFACTURER
// POST manufacturer
app.post("/createManufacturer", async (req, res) => {
  let data = new Manufacturer(req.body);
  const result = await data.save();
  res.send(result);
});

// GET all manufacturer
app.get("/listManufacturer", async (req, res) => {
  let data = await Manufacturer.find();
  res.send(data);
});

// DELETE manufacturer
app.delete("/deleteManufacturer/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Manufacturer.deleteOne(req.params);

  res.send(data);
});

// PUT manufacturer
app.put("/updateManufacturer/:_id", async (req, res) => {
  console.log(req.params);
  let data = await Manufacturer.updateOne(req.params, { $set: req.body });
  res.send(data);
});

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accep, Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Method", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/user", userRoutes);

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

module.exports = app;
