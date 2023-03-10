const mongoose = require("mongoose");

const perusahaanSchema = mongoose.Schema({
  company_name: { type: String, require: true },
  address: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  phone: { type: Number, require: true },
});
module.exports = mongoose.model("perusahaan", perusahaanSchema);
