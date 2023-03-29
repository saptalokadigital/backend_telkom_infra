const mongoose = require("mongoose");

const systemSchema = mongoose.Schema(
  {
    system: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("System", systemSchema);
