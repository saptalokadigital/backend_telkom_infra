const mongoose = require("mongoose");

const loadingSchema = mongoose.Schema({
  cables_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" }],
  kits_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" }],
  cables_turnover_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
  ],
  submitted_cables: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_cable" },
  ],
  submitted_kits: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_kit" },
  ],
  submitted_cables_turnover: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_turnover" },
  ],
  existing_cables_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_cable" },
  ],
  submitted_existing_cables_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_cable" },
  ],
  project_name: { type: String, require: true },
  vessel_name: { type: String, require: true },
  remark: { type: String },
  from: { type: String },
  to: { type: String },
  diserahkan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  diterima: { type: String },
  diketahui: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  perusahaan: { type: mongoose.Schema.Types.ObjectId, ref: "perusahaan" },
  evidence: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
  submitted_date_loading: { type: String },
  submitted_date_offloading: { type: String },
});
module.exports = mongoose.model("loading", loadingSchema);
