const System = require("../../models/system");
require("dotenv").config();

exports.postSystem = (data) =>
    new Promise((resolve, reject) => {
        System.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: "Added System succesfully",
                });
            })
            .catch((e) => {
                console.log(e);
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to added system data",
                });
            });
    });

exports.getAllSystem = () =>
    new Promise((resolve, reject) => {
        System.find({})
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get system succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get system data",
                    data: [],
                })
            );
    });

exports.deleteSystem = (id) =>
    new Promise((resolve, reject) => {
        System.deleteOne({
            _id: id,
        })
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Deleted system succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to deleted system data",
                })
            );
    });

exports.editSystem = (id, data) =>
    new Promise((resolve, reject) => {
        System.updateOne(
            {
                _id: id,
            },
            data
        )
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Edited system succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to edited system data",
                })
            );
    });

exports.getSystemById = (id) =>
    new Promise((resolve, reject) => {
        System.findOne({
            _id: id,
        })
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get system succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get system data",
                    data: null,
                })
            );
    });
