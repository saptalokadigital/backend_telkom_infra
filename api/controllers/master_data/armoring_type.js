const ArmoringType = require("../../models/armoring_type");
require("dotenv").config();

exports.postArmoringType = (data) =>
  new Promise((resolve, reject) => {
    ArmoringType.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added cable type succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added cable type data",
        });
      });
  });

exports.getAllArmoringType = () =>
  new Promise((resolve, reject) => {
    ArmoringType.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get cable type succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get cable type data",
          data: [],
        })
      );
  });

exports.getAllArmoringType = async (req, res, next) => {
  let data = await ArmoringType.find();
  res.send(data);
};

exports.deleteArmoringType = async (req, res, next) => {
  try {
    console.log(req.params);
    await ArmoringType.deleteOne(req.params);
    return res
      .status(200)
      .send({ message: "Deleted armoring type succesfully" });
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
    return res
      .status(200)
      .send({ message: "Updated armoring type succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated armoring type data",
    });
  }
};
