const spareCableModel = require("../models/spare_cable.models");
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
                    $or: [
                        {
                            tank_outer: `${req.params.tank}`,
                        },

                        {
                            tank_inner: `${req.params.tank}`,
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: "system",
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
                    from: "cable_type",
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
                    from: "armoring_type",
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
                    from: "core_type",
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
                    from: "manufacturer",
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
                    tank_outer: 1,
                    tank_inner: 1,
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
