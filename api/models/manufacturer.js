const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema(
  {
    manufacturer: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("manufacturer", manufacturerSchema);
