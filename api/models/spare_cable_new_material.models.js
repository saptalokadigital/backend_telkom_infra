const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const spareCableModel = require("./spare_cable.models");

const cableNewMaterialSchema = new Schema({
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
});

cableNewMaterialSchema.pre("save", async function (next) {
  try {
    const system = await mongoose.model("System").findById(this.system);
    const armoringType = await mongoose
      .model("armoring_type")
      .findById(this.armoring_type);

    if (system && armoringType) {
      const baseLabelId = parseInt(
        `${system.label_id}0${armoringType.label_id}`
      );

      let labelId = baseLabelId;
      let counter = 0;

      while (true) {
        const existingRecord = await spareCableModel.findOne({
          label_id: labelId,
        });

        if (!existingRecord) {
          if (counter === 0) {
            // Mengatur nilai awal dengan format "180301"
            const initialLabelId = parseInt(`${baseLabelId}01`);
            this.label_id = initialLabelId;
          } else {
            this.label_id = labelId;
          }
          break;
        }

        counter++;
        labelId = baseLabelId * 100 + counter;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

cableNewMaterialSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

cableNewMaterialSchema.plugin(uniqueValidator, {
  message: "Email/Username already in use.",
});

const cableNewMaterialModel = mongoose.model(
  "spare_cable_new_material",
  cableNewMaterialSchema
);
module.exports = cableNewMaterialModel;
