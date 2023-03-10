const mongoose = require("mongoose");

const unitSchema = mongoose.Schema({
  unit: { type: String, require: true },
});
module.exports = mongoose.model("Unit", unitSchema);
