const CoreType = require("../../models/core_type");
require("dotenv").config();

exports.postCoreType = async (req, res, next) => {
  try {
    let data = new CoreType(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added core type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added core type data",
    });
  }
};

exports.getAllCoreType = async (req, res, next) => {
  let data = await CoreType.find();
  res.send(data);
};

exports.deleteCoreType = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await CoreType.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted core type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted core type data",
    });
  }
};

exports.editCoreType = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await CoreType.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated core type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated core type data",
    });
  }
};
