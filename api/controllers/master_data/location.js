const Location = require("../../models/location");
require("dotenv").config();

exports.postLocation = async (req, res, next) => {
    let data = new Location(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllLocation = async (req, res, next) => {
    let data = await Location.find();
    res.send(data);
};

exports.deleteLocation = async (req, res, next) => {
    console.log(req.params);
    let data = await Location.deleteOne(req.params);

    res.send(data);
};

exports.editLocation = async (req, res, next) => {
    console.log(req.params);
    let data = await Location.updateOne(req.params, { $set: req.body });
    res.send(data);
};
