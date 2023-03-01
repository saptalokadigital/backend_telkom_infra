const mongoose = require("mongoose");

const spareKitsSchema = mongoose.Schema({
  no: { type: String, require: true },
  lokasi: { type: String, require: true },
  nomor_rak: { type: String, require: true },
  nama_barang: { type: String, require: true },
  part_number: { type: String, require: true },
  serial_number: { type: String, require: true },
  system: { type: String, require: true },
  weight: { type: String, require: true },
  qty: { type: String, require: true },
  unit: { type: String, require: true },
  keterangan: { type: String, require: true },
  tanggal_transaksi: { type: String, require: true },
  aktivitas_transaksi: { type: String, require: true },
  from_to: { type: String, require: true },
  nomor_berita_acara: { type: String, require: true },
});
const spareKit = mongoose.model("spare_kit", spareKitsSchema);
module.exports = spareKit;
