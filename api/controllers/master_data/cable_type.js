const CableType = require("../../models/cable_type");
require("dotenv").config();

exports.postCableType = (data) =>
  new Promise((resolve, reject) => {
    CableType.create(data)
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

exports.getAllCableType = () =>
  new Promise((resolve, reject) => {
    CableType.find({})
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

exports.deleteCableType = (id) =>
  new Promise((resolve, reject) => {
    CableType.deleteOne({
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

exports.editCableType = (id, data) =>
  new Promise((resolve, reject) => {
    CableType.updateOne(
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
