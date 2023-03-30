const ArmoringType = require("../../models/armoring_type");
require("dotenv").config();

exports.postArmoringType = (data) =>
  new Promise((resolve, reject) => {
    ArmoringType.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added ArmoringType succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added ArmoringType data",
        });
      });
  });

exports.getAllArmoringType = () =>
  new Promise((resolve, reject) => {
    ArmoringType.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get ArmoringType succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get ArmoringType data",
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
          msg: "Deleted ArmoringType succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted ArmoringType data",
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
          msg: "Edited ArmoringType succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited ArmoringType data",
        })
      );
  });
