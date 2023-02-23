const mongoose = require("mongoose");

const coreTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("coreType", coreTypeSchema, "core_type");
