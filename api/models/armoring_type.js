const mongoose = require("mongoose");

const armoringTypeSchema = mongoose.Schema(
  {
    armoring_type: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("armoring_type", armoringTypeSchema);
