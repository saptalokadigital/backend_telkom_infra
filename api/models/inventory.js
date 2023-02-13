const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const dashCableSchema = new Schema({
    no: {
        type: Number,
        required: true,
        unique: true,
    },
    label_id: {
        type: Number,
        required: true,
    },
    system: {
        type: String,
    },
    cable_type: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    armoring_type: {
        type: String,
    },
    length_report: {
        type: Number,
        required: true,
    },
    length_meas: {
        type: Number,
        required: true,
    },
    doc_reff: {
        type: Object,
    },
    tank_outer: {
        type: String,
    },
    tank_inner: {
        type: String,
    },
    tank_level: {
        type: Number,
    },
    keterangan: {
        type: String,
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
});

dashCableSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

dashCableSchema.plugin(uniqueValidator, {
    message: "Email/Username already in use.",
});

const dashCableModel = mongoose.model(
    "dashCable",
    dashCableSchema,
    "dashboard_cable"
);
module.exports = dashCableModel;
