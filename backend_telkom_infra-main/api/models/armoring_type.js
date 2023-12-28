const mongoose = require("mongoose");

const armoringTypeSchema = mongoose.Schema(
  {
    armoring_type: { type: String, require: true },
    min_wd: { type: Number },
    max_wd: { type: Number },
    label_id: { type: Number },
  },
  { versionKey: false }
);
module.exports = mongoose.model("armoring_type", armoringTypeSchema);
