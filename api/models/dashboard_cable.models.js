const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const dashCableSchema = new Schema({
    NO: {
        type: Number,
        required: true,
        unique: true,
    },
    "DEPO LOCATION": {
        type: String,
        required: true,
    },
    "LABEL ID": {
        type: Number,
        required: true,
    },
    SYSTEM: {
        type: String,
    },
    "CABLE TYPE": {
        type: String,
    },
    MANUFACTURER: {
        type: String,
    },
    "ARMORING TYPE": {
        type: String,
    },
    "LENGTH REPORT(Meter)": {
        type: Number,
        required: true,
    },
    "LENGTH MEAS(Meter)": {
        type: Number,
        required: true,
    },
    DOC: {
        type: Object,
    },
    "TANK OUTER": {
        type: String,
    },
    "TANK INNER": {
        type: String,
    },
    "TANK LEVEL": {
        type: Number,
    },
    KETERANGAN: {
        type: String,
    },
    "? CORE": {
        type: Number,
    },
    "TANGGAL VALIDASI": {
        type: Date,
    },
    "STATUS VALIDASI": {
        type: Date,
    },
    Remark: {
        type: String,
    },
    lastUpdate: {
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
