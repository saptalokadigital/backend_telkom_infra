const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const spareKitsSchema = new Schema({
  no: {
    type: Number,
  },
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

spareKitsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

spareKitsSchema.plugin(uniqueValidator, {
  message: "Email/Username already in use.",
});

const spareKit = mongoose.model("spare_kit", spareKitsSchema);
module.exports = spareKit;
