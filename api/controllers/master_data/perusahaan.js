const Perusahaan = require("../../models/perusahaan");
require("dotenv").config();

exports.postPerusahaan = async (req, res, next) => {
  let data = new Perusahaan(req.body);
  const result = await data.save();
  res.send(result);
};

exports.getAllPerusahaan = async (req, res, next) => {
  let data = await Perusahaan.find();
  res.send(data);
};

exports.deletePerusahaan = async (req, res, next) => {
  console.log(req.params);
  let data = await Perusahaan.deleteOne(req.params);

  res.send(data);
};

exports.editPerusahaan = async (req, res, next) => {
  console.log(req.params);
  let data = await Perusahaan.updateOne(req.params, { $set: req.body });
  res.send(data);
};
