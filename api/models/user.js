const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    username: { type: String, require: true },
    email: {
        type: String,
        require: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: { type: String, require: true },
});
module.exports = mongoose.model("User", userSchema);
