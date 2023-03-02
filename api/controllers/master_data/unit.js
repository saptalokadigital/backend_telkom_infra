const Unit = require("../../models/unit");
require("dotenv").config();

exports.postUnit = async (req, res, next) => {
    let data = new Unit(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllUnit = async (req, res, next) => {
    let data = await Unit.find();
    res.send(data);
};

exports.deleteUnit = async (req, res, next) => {
    console.log(req.params);
    let data = await Unit.deleteOne(req.params);

    res.send(data);
};

exports.editUnit = async (req, res, next) => {
    console.log(req.params);
    let data = await Unit.updateOne(req.params, { $set: req.body });
    res.send(data);
};
