const mongoose = require("mongoose");

const armoringTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("armoring_type", armoringTypeSchema);
