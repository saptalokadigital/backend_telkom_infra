const mongoose = require("mongoose");

const systemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("System", systemSchema);
