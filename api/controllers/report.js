const spareCableModel = require("../models/spare_cable.models");
const spareKitsSchema = require("../models/spare_kits");
require("dotenv").config();

exports.getReportPopulate = (req, res) => {
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
            system: "$system._id",
            sigma_core: "$sigma_core",
            manufacturer: "$manufacturer._id",
            core_type: "$core_type._id",
            armoring_type: "$armoring_type._id",
            cable_type: "$cable_type._id",
            tank: "$tank",
          },
          count: { $sum: 1 },
          length_report: { $sum: "$length_report" },
          label_id: { $addToSet: "$label_id" },
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
      {
        $lookup: {
          from: "systems",
          localField: "_id.system",
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
          localField: "_id.cable_type",
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
          localField: "_id.armoring_type",
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
          localField: "_id.core_type",
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
          localField: "_id.manufacturer",
          foreignField: "_id",
          as: "manufacturer",
        },
      },
      {
        $unwind: "$manufacturer",
      },
      {
        $project: {
          _id: 0,
          label_id: 1,
          system: "$system.system",
          sigma_core: "$_id.sigma_core",
          manufacturer: "$manufacturer.manufacturer",
          core_type: "$core_type.core_type",
          armoring_type: "$armoring_type.armoring_type",
          cable_type: "$cable_type.cable_type",
          count: 1,
          length_report: 1,
          min_wd: 1,
          max_wd: 1,
          min_spare_length: 1,
          deviasi: 1,
          checking: 1,
          tank: "$_id.tank",
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

exports.getReportKitsPopulate = (req, res) => {
  spareKitsSchema
    .aggregate([
      {
        $group: {
          _id: {
            // system: "$system._id",
            part_number: "$part_number",
          },
          part_number: { $first: "$part_number" },
          qty: { $sum: "$qty" },
          location: { $first: "$location" },
          item_name: { $addToSet: "$item_name" },
          serial_number: { $addToSet: "$serial_number" },
          weight: { $first: "$weight" },
          unit: { $first: "$unit" },
          rak_number: { $addToSet: "$rak_number" },
        },
      },
      // {
      //   $lookup: {
      //     from: "System",
      //     localField: "system",
      //     foreignField: "_id",
      //     as: "system",
      //   },
      // },
      // {
      //   $unwind: "$system",
      // },
      {
        $project: {
          _id: 0,
          system: 1,
          part_number: 1,
          qty: 1,
          location: 1,
          item_name: 1,
          serial_number: 1,
          weight: 1,
          unit: 1,
          rak_number: 1,
        },
      },
    ])
    .exec(function (err, cables) {
      if (err) {
        res.send(err.message);
      } else {
        console.log(cables);
        res.json(cables);
      }
    });
};
