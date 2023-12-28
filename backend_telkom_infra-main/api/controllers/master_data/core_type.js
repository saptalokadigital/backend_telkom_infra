const CoreType = require("../../models/core_type");
require("dotenv").config();

exports.postCoreType = (data) =>
    new Promise((resolve, reject) => {
        CoreType.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: "Added core type succesfully",
                });
            })
            .catch((e) => {
                console.log(e);
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to added core type data",
                });
            });
    });

exports.getAllCoreType = () =>
    new Promise((resolve, reject) => {
        CoreType.find({})
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get core type succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get core type data",
                    data: [],
                })
            );
    });

exports.deleteCoreType = (id) =>
    new Promise((resolve, reject) => {
        CoreType.deleteOne({
            _id: id,
        })
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Deleted core type succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to deleted core type data",
                })
            );
    });

exports.editCoreType = (id, data) =>
    new Promise((resolve, reject) => {
        CoreType.updateOne(
            {
                _id: id,
            },
            data
        )
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Edited core type succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to edited core type data",
                })
            );
    });

exports.getCoreTypeById = (id) =>
    new Promise((resolve, reject) => {
        CoreType.findOne({
            _id: id,
        })
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get core type succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get core type data",
                    data: [],
                })
            );
    });
