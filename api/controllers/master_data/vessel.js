const Vessel = require("../../models/vessel");
require("dotenv").config();

exports.postVessel = (data) =>
    new Promise((resolve, reject) => {
        Vessel.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: "Added vessel succesfully",
                });
            })
            .catch((e) => {
                console.log(e);
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to added vessel data",
                });
            });
    });

exports.getAllVessel = () =>
    new Promise((resolve, reject) => {
        Vessel.find({})
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get vessel succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get vessel data",
                    data: [],
                })
            );
    });

exports.deleteVessel = (id) =>
    new Promise((resolve, reject) => {
        Vessel.deleteOne({
            _id: id,
        })
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Deleted vessel succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to deleted vessel data",
                })
            );
    });

exports.editVessel = (id, data) =>
    new Promise((resolve, reject) => {
        Vessel.updateOne(
            {
                _id: id,
            },
            data
        )
            .then(() =>
                resolve({
                    sukses: true,
                    msg: "Edited vessel succesfully",
                })
            )
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to edited vessel data",
                })
            );
    });

exports.getVesselById = (id) =>
    new Promise((resolve, reject) => {
        Vessel.findOne({
            _id: id,
        })
            .then((res) => {
                resolve({
                    sukses: true,
                    msg: "Get vessel succesfully",
                    data: res,
                });
            })
            .catch(() =>
                reject({
                    sukses: false,
                    msg: "Ooopps, Failed to get vessel data",
                    data: [],
                })
            );
    });