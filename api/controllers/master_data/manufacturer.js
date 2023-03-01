const Manufacturer = require("../../models/manufacturer");
require("dotenv").config();

exports.postManufacturer = async (req, res, next) => {
    let data = new Manufacturer(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllManufacturer = async (req, res, next) => {
    let data = await Manufacturer.find();
    res.send(data);
};

exports.deleteManufacturer = async (req, res, next) => {
    console.log(req.params);
    let data = await Manufacturer.deleteOne(req.params);

    res.send(data);
};

exports.editManufacturer = async (req, res, next) => {
    console.log(req.params);
    let data = await Manufacturer.updateOne(req.params, { $set: req.body });
    res.send(data);
};
