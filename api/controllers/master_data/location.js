const Location = require("../../models/location");
require("dotenv").config();

exports.postLocation = (data) =>
  new Promise((resolve, reject) => {
    Location.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added location succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added location data",
        });
      });
  });

exports.getAllLocation = () =>
  new Promise((resolve, reject) => {
    Location.find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Get location succesfully",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to get location data",
          data: [],
        })
      );
  });

exports.deleteLocation = (id) =>
  new Promise((resolve, reject) => {
    Location.deleteOne({
      _id: id,
    })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Deleted location succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to deleted location data",
        })
      );
  });

exports.editLocation = (id, data) =>
  new Promise((resolve, reject) => {
    Location.updateOne(
      {
        _id: id,
      },
      data
    )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Edited Location succesfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Ooopps, Failed to edited Location data",
        })
      );
  });
