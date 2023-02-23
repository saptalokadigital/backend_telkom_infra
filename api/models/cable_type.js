const mongoose = require("mongoose");

const cableTypeSchema = mongoose.Schema({
  cable_type: { type: String, require: true },
});
const cableType = mongoose.model("cable_type", cableTypeSchema);
module.exports = cableType;
