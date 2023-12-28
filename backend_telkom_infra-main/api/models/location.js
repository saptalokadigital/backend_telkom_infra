const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    location: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Location", locationSchema);
