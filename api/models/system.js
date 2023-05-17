const mongoose = require("mongoose");

const systemSchema = mongoose.Schema(
  {
    system: { type: String, require: true },
    label_id: { type: Number },
  },
  { versionKey: false }
);
module.exports = mongoose.model("System", systemSchema);
