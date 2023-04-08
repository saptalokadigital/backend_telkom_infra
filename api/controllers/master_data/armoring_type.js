const ArmoringType = require("../../models/armoring_type");
require("dotenv").config();

exports.postArmoringType = (data) =>
  new Promise((resolve, reject) => {
    ArmoringType.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added armoring type succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added armoring type data",
        });
      });
  });

exports.getAllArmoringType = () =>
  new Promise((resolve, reject) => {
    ArmoringType.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get armoring type succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get armoring type data",
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
          msg: "Deleted armoring type succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted armoring type data",
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
          msg: "Edited armoring type succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited armoring type data",
        })
      );
  });

exports.getArmoringTypeById = (id) =>
  new Promise((resolve, reject) => {
    ArmoringType.findOne({
      _id: id,
    })
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get armoring type succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get armoring type data",
          data: [],
        })
      );
  });
