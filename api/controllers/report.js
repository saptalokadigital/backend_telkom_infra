const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

exports.getReportPopulate = (req, res, next) => {
    spareCableModel
        .aggregate([
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
                $group: {
                    _id: {
                        // system: "$system._id",
                        sigma_core: "$sigma_core",
                        manufacturer: "$manufacturer._id",
                        core_type: "$core_type._id",
                        armoring_type: "$armoring_type._id",
                        cable_type: "$cable_type._id",
                    },
                    count: { $sum: 1 },
                    length_report: { $sum: "$length_report" },
                    min_wd: { $first: "$armoring_type.min_wd" },
                    max_wd: { $first: "$armoring_type.max_wd" },
                },
            },
            {
                $addFields: {
                    min_spare_length: { $multiply: [5, "$max_wd", 3] },
                },
            },
            {
                $addFields: {
                    deviasi: {
                        $subtract: ["$length_report", "$min_spare_length"],
                    },
                },
            },
            {
                $addFields: {
                    checking: {
                        $cond: [{ $gte: ["$deviasi", 0] }, true, false],
                    },
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
