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

exports.deleteArmoringType = (id) =>
  new Promise((resolve, reject) => {
    ArmoringType.deleteOne({
      _id: id,
    })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Deleted cable type succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted cable type data",
        })
      );
  });

exports.editArmoringType = (id, data) =>
  new Promise((resolve, reject) => {
    ArmoringType.updateOne(
      {
        _id: id,
      },
      data
    )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Edited cable type succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited cable type data",
        })
      );
  });
