const mongoose = require("mongoose");

const coreTypeSchema = mongoose.Schema({
    core_type: { type: String, require: true },
});
module.exports = mongoose.model("core_type", coreTypeSchema);
