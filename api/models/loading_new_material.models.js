const mongoose = require("mongoose");

const offLoadingNewMaterialSchema = mongoose.Schema({
  project_name: { type: String, require: true },
  remark: { type: String },
  date: { type: String },
  new_material_cables: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable_new_material" },
  ],
  submitted_new_material_cables_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "submitted_cable" },
  ],
  submitted_new_material_cables_id_in_spare_cable: [
    { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
  ],
  evidence: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
  submitted_date_new_material: { type: String },
  first_digit_bast: { type: Number },
  no_bast: { type: String },
  month: { type: String },
  year: { type: String },
});

module.exports = mongoose.model(
  "loading_new_material",
  offLoadingNewMaterialSchema
);
