const mongoose = require("mongoose");

const dashboardCableSchema = mongoose.Schema({
  label_id: { type: String, require: true },
  system: { type: mongoose.Schema.Types.ObjectId, ref: "system" },
  cable_type: { type: mongoose.Schema.Types.ObjectId, ref: "cable_type" },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "id_manufacturer" },
  armoring_type: { type: mongoose.Schema.Types.ObjectId, ref: "armoring_type" },
  core_type: { type: mongoose.Schema.Types.ObjectId, ref: "core_type" },
  sigma_core: { type: String, require: true },
  length_report: { type: String, require: true },
  length_meas: { type: String, require: true },
  tank_inner: { type: String, require: true },
  tank_outer: { type: String, require: true },
  tank_level: { type: String, require: true },
  remark: { type: String, require: true },
});
const system = mongoose.model("dashboard_cable", dashboardCableSchema);
module.exports = system;
