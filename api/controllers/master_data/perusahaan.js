const Perusahaan = require("../../models/perusahaan");
require("dotenv").config();

exports.postPerusahaan = (data) =>
  new Promise((resolve, reject) => {
    Perusahaan.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added Perusahaan succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added Perusahaan data",
        });
      });
  });

exports.getAllPerusahaan = () =>
  new Promise((resolve, reject) => {
    Perusahaan.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get Perusahaan succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get Perusahaan data",
          data: [],
        })
      );
  });

exports.deletePerusahaan = (id) =>
  new Promise((resolve, reject) => {
    Perusahaan.deleteOne({
      _id: id,
    })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Deleted Perusahaan succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted Perusahaan data",
        })
      );
  });

exports.editPerusahaan = (id, data) =>
  new Promise((resolve, reject) => {
    Perusahaan.updateOne(
      {
        _id: id,
      },
      data
    )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Edited Perusahaan succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited Perusahaan data",
        })
      );
  });
