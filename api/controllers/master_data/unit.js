const Unit = require("../../models/unit");
require("dotenv").config();

exports.postUnit = (data) =>
  new Promise((resolve, reject) => {
    Unit.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added Unit succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added Unit data",
        });
      });
  });

exports.getAllUnit = () =>
  new Promise((resolve, reject) => {
    Unit.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get Unit succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get Unit data",
          data: [],
        })
      );
  });

exports.deleteUnit = (id) =>
  new Promise((resolve, reject) => {
    Unit.deleteOne({
      _id: id,
    })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Deleted Unit succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted Unit data",
        })
      );
  });

exports.editUnit = (id, data) =>
  new Promise((resolve, reject) => {
    Unit.updateOne(
      {
        _id: id,
      },
      data
    )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Edited Unit succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited Unit data",
        })
      );
  });
