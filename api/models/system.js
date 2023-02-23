const mongoose = require("mongoose");

const systemSchema = mongoose.Schema({
  system: { type: String, require: true },
});
const system = mongoose.model("system", systemSchema);
module.exports = system;
