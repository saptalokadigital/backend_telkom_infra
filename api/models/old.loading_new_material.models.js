const mongoose = require("mongoose");

const loadingNewMaterialSchema = mongoose.Schema({
  cables_id: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
    },
  ],
  submitted_new_material: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spare_cable_new_material",
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
  evidence: {
    data: Buffer,
    contentType: String,
    originalName: String,
  },
});
module.exports = mongoose.model(
  "loading_new_material",
  loadingNewMaterialSchema
);
