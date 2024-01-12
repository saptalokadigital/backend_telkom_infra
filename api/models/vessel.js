const mongoose = require("mongoose");

const vesselSchema = mongoose.Schema(
  {
    vessel_name: { type: String, require: true },
  },
  { versionKey: false }
);
module.exports = mongoose.model("vessel", vesselSchema);