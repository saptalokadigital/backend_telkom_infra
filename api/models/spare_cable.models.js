const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const spareCableSchema = new Schema(
  {
    no: {
      type: Number,
    },
    depo_location: {
      type: String,
    },
    label_id: {
      type: Number,
    },
    system: { type: mongoose.Schema.Types.ObjectId, ref: "System" },
    cable_type: { type: mongoose.Schema.Types.ObjectId, ref: "cable_type" },

    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "manufacturer" },

    armoring_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "armoring_type",
    },

    core_type: { type: mongoose.Schema.Types.ObjectId, ref: "core_type" },

    length_report: {
      type: Number,
      required: true,
    },
    length_meas: {
      type: Number,
    },
    doc_reff: {
      type: Object,
    },
    tank: {
      type: String,
    },
    tank_location: {
      type: String,
    },
    tank_level: {
      type: Number,
    },
    keterangan: {
      type: String,
    },
    evidence: {
      data: Buffer,
      contentType: String,
      originalName: String,
    },
    sigma_core: {
      type: Number,
    },
    tanggal_validasi: {
      type: Date,
    },
    status_validasi: {
      type: Date,
    },
    remark: {
      type: String,
    },
    last_update: {
      type: Date,
    },
    E_core: {
      type: Number,
    },
    priceIdr: {
      type: Number,
    },
    priceUsd: {
      type: Number,
    },
  },
  { versionKey: false }
);

spareCableSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

spareCableSchema.plugin(uniqueValidator, {
  message: "Email/Username already in use.",
});

const spareCableModel = mongoose.model("spare_cable", spareCableSchema);
module.exports = spareCableModel;
