const CableType = require("../../models/cable_type");
require("dotenv").config();

exports.postCableType = async (req, res, next) => {
    let data = new CableType(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllCableType = async (req, res, next) => {
    let data = await CableType.find();
    res.send(data);
};

exports.deleteCableType = async (req, res, next) => {
    console.log(req.params);
    let data = await CableType.deleteOne(req.params);

    res.send(data);
};

exports.editCableType = async (req, res, next) => {
    console.log(req.params);
    let data = await CableType.updateOne(req.params, { $set: req.body });
    res.send(data);
};
