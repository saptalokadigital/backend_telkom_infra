const mongoose = require("mongoose");

const spareKitsSchema = mongoose.Schema({
    no: { type: String, require: true },
    location: { type: String, require: true },
    rak_number: { type: String, require: true },
    item_name: { type: String, require: true },
    part_number: { type: String, require: true },
    serial_number: { type: String, require: true },
    system: { type: mongoose.Schema.Types.ObjectId, ref: "System" },
    weight: { type: Number },
    qty: { type: Number },
    unit: { type: String, require: true },
    keterangan: { type: String, require: true },
    tanggal_transaksi: { type: Date },
    aktivitas_transaksi: { type: String, require: true },
    from_to: { type: String, require: true },
    nomor_berita_acara: { type: String, require: true },
});
const spareKit = mongoose.model("spare_kit", spareKitsSchema);
module.exports = spareKit;
