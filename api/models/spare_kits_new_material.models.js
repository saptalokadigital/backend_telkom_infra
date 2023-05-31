const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const spareKitsNewMaterialSchema = new Schema(
  {
    no: {
      type: Number,
    },
    location: { type: String, require: true },
    rak_number: { type: String, require: true },
    item_name: { type: String, require: true },
    part_number: { type: String, require: true },
    serial_number: { type: String, require: true },
    system: { type: mongoose.Schema.Types.ObjectId, ref: "System" },
    weight_kg: { type: Number },
    qty: { type: Number },
    unit: { type: String },
    keterangan: { type: String },
    tanggal_transaksi: { type: Date },
    aktivitas_transaksi: { type: String },
    from_to: { type: String },
    nomor_berita_acara: { type: String },
    unitPriceIdr: { type: Number },
    unitPriceUsd: { type: Number },
  },
  { versionKey: false }
);

spareKitsNewMaterialSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

spareKitsNewMaterialSchema.plugin(uniqueValidator, {
  message: "Email/Username already in use.",
});

const spareKit = mongoose.model(
  "spare_kit_new_material",
  spareKitsNewMaterialSchema
);
module.exports = spareKit;
