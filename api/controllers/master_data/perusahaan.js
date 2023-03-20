const Perusahaan = require("../../models/perusahaan");
require("dotenv").config();

exports.postPerusahaan = async (req, res, next) => {
  try {
    let data = new Perusahaan(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added perusahaan succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added perusahaan data",
    });
  }
};

exports.getAllPerusahaan = async (req, res, next) => {
  let data = await Perusahaan.find();
  res.send(data);
};

exports.deletePerusahaan = async (req, res, next) => {
  try {
    console.log(req.params);
    await Perusahaan.deleteOne(req.params);
    return res.status(200).send({ message: "Deleted perusahaan succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted perusahaan data",
    });
  }
};

exports.editPerusahaan = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await Perusahaan.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated perusahaan succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated perusahaan data",
    });
  }
};
