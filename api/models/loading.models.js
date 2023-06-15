const mongoose = require("mongoose");

const loadingSchema = mongoose.Schema({
  cables_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" }],
  kits_id: [
    {
      kit: { type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" },
      qty: { type: Number },
    },
  ],
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
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
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
  first_digit_bast: { type: Number },
  no_bast: { type: String },
  first_digit_invoice: { type: Number },
  no_invoice: { type: String },
  month: { type: String },
  year: { type: String },
  first_digit_bast_offloading: { type: Number },
  no_bast_offloading: { type: String },
  first_digit_invoice_offloading: { type: Number },
  no_invoice_offloading: { type: String },
  month_offloading: { type: String },
  year_offloading: { type: String },
});
module.exports = mongoose.model("loading", loadingSchema);
