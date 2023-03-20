const Unit = require("../../models/unit");
require("dotenv").config();

exports.postUnit = async (req, res, next) => {
  try {
    let data = new Unit(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added unit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added unit data",
    });
  }
};

exports.getAllUnit = async (req, res, next) => {
  let data = await Unit.find();
  res.send(data);
};

exports.deleteUnit = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Unit.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted unit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted unit data",
    });
  }
};

exports.editUnit = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Unit.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated unit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated unit data",
    });
  }
};
