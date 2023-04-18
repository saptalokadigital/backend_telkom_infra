const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

exports.getChart = async (req, res, next) => {
  spareCableModel
    .aggregate([
      //Group by cable type and armoring type
      {
        $group: {
          _id: {
            cable_type: "$cable_type",
            armoring_type: "$armoring_type",
          },
          length: { $sum: "$length_report" },
          totalCable: { $sum: 1 },
        },
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
        $project: {
          _id: 0,
          cable_type: "$cable_type.cable_type",
          armoring_type: "$armoring_type.armoring_type",
          length: 1,
          totalCable: 1,
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

// get chart by cable type and armoring type
exports.getChartByCableTypeAndArmoringType = async (req, res, next) => {
  spareCableModel
    .aggregate([
      //Group by cable type and armoring type
      {
        $group: {
          _id: {
            cable_type: "$cable_type",
            armoring_type: "$armoring_type",
          },
          length: { $sum: "$length_report" },
          totalCable: { $sum: 1 },
        },
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
        $project: {
          _id: 0,
          cable_type: "$cable_type.cable_type",
          armoring_type: "$armoring_type.armoring_type",
          length: 1,
          totalCable: 1,
        },
      },
    ])
    .exec(function (err, result) {
      if (err) throw err;
      const filteredResult = result.filter(
        (group) =>
          group.cable_type === req.params.cable_type &&
          group.armoring_type === req.params.armoring_type
      );
      res.json(filteredResult);
    });
};
