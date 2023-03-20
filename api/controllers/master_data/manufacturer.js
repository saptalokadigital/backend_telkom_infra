const Manufacturer = require("../../models/manufacturer");
require("dotenv").config();

exports.postManufacturer = async (req, res, next) => {
  try {
    let data = new Manufacturer(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added manufacturer succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added manufacturer data",
    });
  }
};

exports.getAllManufacturer = async (req, res, next) => {
  let data = await Manufacturer.find();
  res.send(data);
};

exports.deleteManufacturer = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Manufacturer.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted manufacturer succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted manufacturer data",
    });
  }
};

exports.editManufacturer = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Manufacturer.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated manufacturer succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated manufacturer data",
    });
  }
};
