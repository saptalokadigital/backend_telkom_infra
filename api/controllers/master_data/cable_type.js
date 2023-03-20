const CableType = require("../../models/cable_type");
require("dotenv").config();

exports.postCableType = async (req, res, next) => {
  try {
    let data = new CableType(req.body);
    const result = await data.save();
    return res.status(200).send({ message: "Deleted cable type succesfully", result });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added cable type data",
    });
  }
};

exports.getAllCableType = async (req, res, next) => {
  let data = await CableType.find();
  res.send(data);
};

exports.deleteCableType = async (req, res, next) => {
  try {
    console.log(req.params);
    await CableType.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted cable type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted cable type data",
    });
  }
};

exports.editCableType = async (req, res, next) => {
  try {
    console.log(req.params);
    await CableType.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated cable type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated cable type data",
    });
  }
};
