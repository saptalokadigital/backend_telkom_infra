const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema({
  manufacturer: { type: String, require: true },
});
const Manufacturer = mongoose.model("id_manufacturer", manufacturerSchema);
module.exports = Manufacturer;
