const mongoose = require("mongoose");

const cableTypeSchema = mongoose.Schema(
  {
    cable_type: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("cable_type", cableTypeSchema);
