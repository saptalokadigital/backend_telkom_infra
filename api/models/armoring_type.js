const mongoose = require("mongoose");

const armoringTypeSchema = mongoose.Schema({
  armoring_type: { type: String, require: true },
});
const armoringType = mongoose.model("armoring_type", armoringTypeSchema);
module.exports = armoringType;
