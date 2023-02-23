const mongoose = require("mongoose");

const coreTypeSchema = mongoose.Schema({
  core_type: { type: String, require: true },
});
const coreType = mongoose.model("core_type", coreTypeSchema);
module.exports = coreType;
