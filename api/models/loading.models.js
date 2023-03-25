const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    cables_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spareCable" }],
    kits_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" }],
  },
  { versionKey: false }
);
module.exports = mongoose.model("project", projectSchema);
