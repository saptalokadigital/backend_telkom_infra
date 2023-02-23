const mongoose = require("mongoose");

const spareCableSchema = mongoose.Schema({
  no: { type: String, require: true },
  depo_location: { type: String, require: true },
  label_id: { type: String, require: true },
  system: { type: String, require: true },
  cable_type: { type: String, require: true },
  manufacturer: { type: String, require: true },
  armoring_type: { type: String, require: true },
  core_type: { type: String, require: true },
  Σ_CORE: { type: String, require: true },
  length_report_meter: { type: String, require: true },
  length_meas_meter: { type: String, require: true },
  doc_reff: { type: String, require: true },
  tank_inner: { type: String, require: true },
  tank_outter: { type: String, require: true },
  tank_level: { type: String, require: true },
  remark: { type: String, require: true },
  keterangan: { type: String, require: true },
  tanggal_validasi: { type: String, require: true },
  status_validasi: { type: String, require: true },
  tanggal_transaksi: { type: String, require: true },
  aktivitas_transaksi: { type: String, require: true },
  from_to: { type: String, require: true },
  nomor_berita_acara: { type: String, require: true },
});
const spareCable = mongoose.model("spare_cable", spareCableSchema);
module.exports = spareCable;
