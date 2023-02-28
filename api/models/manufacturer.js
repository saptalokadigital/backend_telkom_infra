const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("manufacturer", manufacturerSchema);
