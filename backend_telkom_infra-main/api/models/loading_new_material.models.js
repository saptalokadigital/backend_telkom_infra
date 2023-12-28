const mongoose = require("mongoose");

const offLoadingNewMaterialSchema = mongoose.Schema({
  project_name: { type: String, require: true },
  remark: { type: String },
  from: { type: String },
  to: { type: String },
  diserahkan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  diterima: { type: String },
  diketahui: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  perusahaan: { type: mongoose.Schema.Types.ObjectId, ref: "perusahaan" },
  date: { type: String },
  new_material_cables: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable_new_material" },
  ],
  new_material_kits: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_kit_new_material" },
  ],
  submitted_new_material_cables_id_in_spare_cable: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
  ],
  submitted_new_material_kits_id_in_spare_kits: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" },
  ],
  evidence: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
  submitted_date_new_material_loading: { type: String },
  first_digit_bast: { type: Number },
  no_bast: { type: String },
  month: { type: String },
  year: { type: String },
  isSubmitted: { type: Boolean, default: false },
  status: {type: String},
  date:{type:Date}
});

module.exports = mongoose.model(
  "loading_new_material",
  offLoadingNewMaterialSchema
);
