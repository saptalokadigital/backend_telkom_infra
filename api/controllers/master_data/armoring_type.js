const ArmoringType = require("../../models/armoring_type");
require("dotenv").config();

exports.postArmoringType = async (req, res, next) => {
    let data = new ArmoringType(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllArmoringType = async (req, res, next) => {
    let data = await ArmoringType.find();
    res.send(data);
};

exports.deleteArmoringType = async (req, res, next) => {
    console.log(req.params);
    let data = await ArmoringType.deleteOne(req.params);

    res.send(data);
};

exports.editArmoringType = async (req, res, next) => {
    console.log(req.params);
    let data = await ArmoringType.updateOne(req.params, { $set: req.body });
    res.send(data);
};
