const ArmoringType = require("../../models/armoring_type");
require("dotenv").config();

exports.postArmoringType = async (req, res, next) => {
  try {
    let data = new ArmoringType(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added armoring type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added armoring type data",
    });
  }
};

exports.getAllArmoringType = async (req, res, next) => {
  let data = await ArmoringType.find();
  res.send(data);
};

exports.deleteArmoringType = async (req, res, next) => {
  try {
    console.log(req.params);
    await ArmoringType.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted armoring type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted armoring type data",
    });
  }
};

exports.editArmoringType = async (req, res, next) => {
  try {
    console.log(req.params);
    await ArmoringType.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated armoring type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated armoring type data",
    });
  }
};
