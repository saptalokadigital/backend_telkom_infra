const mongoose = require("mongoose");

const loadingSchema = mongoose.Schema({
  cables_id: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
      priceIdr: { type: Number },
      priceUsd: { type: Number },
    },
  ],
  kits_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" }],
  cables_turnover_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
  ],
  submitted_cables: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "submitted_cable" },
      priceIdr: { type: Number },
      priceUsd: { type: Number },
    },
  ],
  submitted_kits: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_kit" },
  ],
  submitted_cables_turnover: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_turnover" },
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
});
module.exports = mongoose.model("loading", loadingSchema);
