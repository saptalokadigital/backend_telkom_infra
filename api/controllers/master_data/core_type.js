const CoreType = require("../../models/core_type");
require("dotenv").config();

exports.postCoreType = async (req, res, next) => {
    let data = new CoreType(req.body);
    const result = await data.save();
    res.send(result);
};

exports.getAllCoreType = async (req, res, next) => {
    let data = await CoreType.find();
    res.send(data);
};

exports.deleteCoreType = async (req, res, next) => {
    console.log(req.params);
    let data = await CoreType.deleteOne(req.params);

    res.send(data);
};

exports.editCoreType = async (req, res, next) => {
    console.log(req.params);
    let data = await CoreType.updateOne(req.params, { $set: req.body });
    res.send(data);
};
