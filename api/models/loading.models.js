const mongoose = require("mongoose");

const loadingSchema = mongoose.Schema({
    cables_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" }],
    kits_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "spare_kit" }],
    cables_turnover_id: [
        { type: mongoose.Schema.Types.ObjectId, ref: "spare_cable" },
    ],

    project_name: { type: String, require: true },
    vessel_name: { type: String, require: true },
    remark: { type: String },
    from: { type: String },
    to: { type: String },
    diserahkan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    diterima: { type: String },
    diketahui: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    perusahaan: { type: mongoose.Schema.Types.ObjectId, ref: "perusahaan" },
});
module.exports = mongoose.model("loading", loadingSchema);
