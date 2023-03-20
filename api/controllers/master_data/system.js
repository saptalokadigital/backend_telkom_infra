const System = require("../../models/system");
require("dotenv").config();

exports.postSystem = async (req, res, next) => {
  try {
    let data = new System(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added system succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added system data",
    });
  }
};

exports.getAllSystem = async (req, res, next) => {
  let data = await System.find();
  res.send(data);
};

exports.deleteSystem = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await System.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted system succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted system data",
    });
  }
};

exports.editSystem = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await System.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated system succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated system data",
    });
  }
};
