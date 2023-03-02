const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    location: { type: String, require: true },
});
module.exports = mongoose.model("Location", locationSchema);
