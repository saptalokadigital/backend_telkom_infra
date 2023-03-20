const Location = require("../../models/location");
require("dotenv").config();

exports.postLocation = async (req, res, next) => {
  try {
    let data = new Location(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added location succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added location data",
    });
  }
};

exports.getAllLocation = async (req, res, next) => {
  let data = await Location.find();
  res.send(data);
};

exports.deleteLocation = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Location.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted location succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted location data",
    });
  }
};

exports.editLocation = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Location.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated location succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated location data",
    });
  }
};
