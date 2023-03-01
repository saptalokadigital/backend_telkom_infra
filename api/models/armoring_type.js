const mongoose = require("mongoose");

const armoringTypeSchema = mongoose.Schema({
    armoring_type: { type: String, require: true },
});
module.exports = mongoose.model("armoring_type", armoringTypeSchema);
