const Manufacturer = require("../../models/manufacturer");
require("dotenv").config();

exports.postManufacturer = (data) =>
    new Promise((resolve, reject) => {
        Manufacturer.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: "Added Manufacturer succesfully",
                });
            })
            .catch((e) => {
                console.log(e);
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to added Manufacturer data",
                });
            });
    });

exports.getAllManufacturer = () =>
    new Promise((resolve, reject) => {
        Manufacturer.find({})
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get Manufacturer succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get Manufacturer data",
                    data: [],
                })
            );
    });

exports.deleteManufacturer = (id) =>
    new Promise((resolve, reject) => {
        Manufacturer.deleteOne({
            _id: id,
        })
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Deleted Manufacturer succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to deleted Manufacturer data",
                })
            );
    });

exports.editManufacturer = (id, data) =>
    new Promise((resolve, reject) => {
        Manufacturer.updateOne(
            {
                _id: id,
            },
            data
        )
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Edited Manufacturer succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to edited Manufacturer data",
                })
            );
    });

exports.getManufacturerById = (id) =>
    new Promise((resolve, reject) => {
        Manufacturer.findOne({
            _id: id,
        })
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get Manufacturer succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get Manufacturer data",
                    data: [],
                })
            );
    });
