const System = require("../../models/system");
require("dotenv").config();

exports.postSystem = async (req, res, next) => {
    let data = new System(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllSystem = async (req, res, next) => {
    let data = await System.find();
    res.send(data);
};

exports.deleteSystem = async (req, res, next) => {
    console.log(req.params);
    let data = await System.deleteOne(req.params);

    res.send(data);
};

exports.editSystem = async (req, res, next) => {
    console.log(req.params);
    let data = await System.updateOne(req.params, { $set: req.body });
    res.send(data);
};
