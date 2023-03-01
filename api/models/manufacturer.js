const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema({
    manufacturer: { type: String, require: true },
});
module.exports = mongoose.model("manufacturer", manufacturerSchema);
