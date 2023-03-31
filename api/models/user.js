const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, require: true },
    username: { type: String, unique: true, require: true },
    role: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: { type: String, require: true },
    cartCable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "spare_cable",
      },
    ],
    cartKit: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "spare_kit",
      },
    ],
  },
  { versionKey: false }
);
module.exports = mongoose.model("User", userSchema);
