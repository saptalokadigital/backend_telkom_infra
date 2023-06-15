const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const submittedKitsSchema = new Schema({
  no: {
    type: Number,
  },
  location: { type: String },
  rak_number: { type: String },
  item_name: { type: String },
  part_number: { type: String },
  serial_number: { type: String },
  system: { type: mongoose.Schema.Types.ObjectId, ref: "System" },

  weight_kg: { type: Number },
  qty: { type: Number },
  unit: { type: String },
  keterangan: { type: String },
  tanggal_transaksi: { type: Date },
  aktivitas_transaksi: { type: String },
  from_to: { type: String },
  nomor_berita_acara: { type: String },
  is_offloaded: { type: Boolean, default: false },
  unitPriceIdr: { type: Number },
  unitPriceUsd: { type: Number },
  qty_taken: { type: Number },
});

submittedKitsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

submittedKitsSchema.plugin(uniqueValidator, {
  message: "Email/Username already in use.",
});

const submittedKitModel = mongoose.model("submitted_kit", submittedKitsSchema);
module.exports = submittedKitModel;
