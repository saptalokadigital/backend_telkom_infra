const mongoose = require("mongoose");

const coreTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("core_type", coreTypeSchema);
