const spareCableModel = require("../models/spare_cable.models");
const spareKitModel = require("../models/spare_kits");
require("dotenv").config();

exports.getTank = (req, res, next) => {
    spareCableModel;
    // .find({
    //     $or: [
    //         {
    //             tank_outer: `${req.params.tank}`,
    //         },
    //         {
    //             tank_inner: `${req.params.tank}`,
    //         },
    //     ],
    // })
    spareCableModel
        .aggregate([
            {
                $match: {
                    tank_location: {
                        $regex: req.params.tank,
                        $options: "i",
                    },
                },
            },
            {
                $lookup: {
                    from: "systems",
                    localField: "system",
                    foreignField: "_id",
                    as: "system",
                },
            },
            {
                $unwind: "$system",
            },
            {
                $lookup: {
                    from: "cable_types",
                    localField: "cable_type",
                    foreignField: "_id",
                    as: "cable_type",
                },
            },
            {
                $unwind: "$cable_type",
            },
            {
                $lookup: {
                    from: "armoring_types",
                    localField: "armoring_type",
                    foreignField: "_id",
                    as: "armoring_type",
                },
            },
            {
                $unwind: "$armoring_type",
            },
            {
                $lookup: {
                    from: "core_types",
                    localField: "core_type",
                    foreignField: "_id",
                    as: "core_type",
                },
            },
            {
                $unwind: "$core_type",
            },
            {
                $lookup: {
                    from: "manufacturers",
                    localField: "manufacturer",
                    foreignField: "_id",
                    as: "manufacturer",
                },
            },
            {
                $unwind: "$manufacturer",
            },
            {
                $project: {
                    _id: 1,
                    cable_type: "$cable_type.cable_type",
                    armoring_type: "$armoring_type.armoring_type",
                    core_type: "$core_type.core_type",
                    manufacturer: "$manufacturer.manufacturer",
                    system: "$system.system",
                    tank: 1,
                    tank_location: 1,
                    length_report: 1,
                    length_meas: 1,
                    doc_reff: 1,
                    tank_level: 1,
                    label_id: 1,
                },
            },
        ])
        .exec(function (err, cables) {
            if (err) {
                res.send("error has occured");
            } else {
                console.log(cables);
                res.json(cables);
            }
        });
};
exports.getTankKits = (req, res, next) => {
    spareKitModel
        .aggregate([
            {
                $match: {
                    rak_number: {
                        $regex: req.params.tank,
                        $options: "i",
                    },
                },
            },
            {
                $lookup: {
                    from: "systems",
                    localField: "system",
                    foreignField: "_id",
                    as: "system",
                },
            },
            {
                $unwind: "$system",
            },

            {
                $project: {
                    _id: 1,
                    no: 1,
                    rak_number: 1,
                    item_name: 1,
                    part_number: 1,
                    serial_number: 1,
                    system: "$system.system",
                    weight_kg: 1,
                    qty: 1,
                    unit: 1,
                },
            },
        ])
        .exec(function (err, cables) {
            if (err) {
                res.send("error has occured");
            } else {
                console.log(cables);
                res.json(cables);
            }
        });
};
