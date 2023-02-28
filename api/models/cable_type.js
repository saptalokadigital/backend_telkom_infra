const mongoose = require("mongoose");

const cableTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
});
module.exports = mongoose.model("cableType", cableTypeSchema);
