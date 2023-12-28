const spareCableModel = require("../models/spare_cable.models");
const CableType = require("../models/cable_type");
const ArmoringType = require("../models/armoring_type");
require("dotenv").config();

exports.getChart = async (req, res) => {
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
exports.getChartByCableTypeAndArmoringType = async (req, res) => {
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

exports.getChartByCableType = async (req, res) => {
  // Get all cable types
  const cableTypes = await CableType.find().exec();

  const newCableTypeFields = []; // Define newCableTypeFields here

  cableTypes.forEach((cableType, index) => {
    const nomor = `${index + 1}`;
    const newField = { cable_type: cableType, armoring_types: [], nomor };
    newCableTypeFields.push(newField);
  });

  // Get all armoring types
  const armoringTypes = await ArmoringType.find().exec();

  // Query to group by cable type and armoring type
  const query = [
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
    // Group by cable type
    {
      $group: {
        _id: "$cable_type.cable_type",
        armoring_types: {
          $push: {
            armoring_type: "$armoring_type.armoring_type",
            length: "$length",
            totalCable: "$totalCable",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        nomor: { $sum: 1 },
        cable_type: "$_id",
        armoring_types: 1,
      },
    },
    {
      $sort: {
        cable_type: 1, // 1 untuk ascending order dan -1 untuk descending order
      },
    },
  ];

  // Execute the query
  spareCableModel.aggregate(query).exec(function (err, cables) {
    if (err) {
      res.send("error has occurred");
    } else {
      // Modify the result to include all armoring types for each cable type
      const modifiedCables = cableTypes.map((cableType, index) => {
        const armoringTypesForCableType = armoringTypes.map((armoringType) => {
          const foundArmoringType = cables.find(
            (cable) =>
              cable.cable_type === cableType.cable_type &&
              cable.armoring_types.some(
                (arm) => arm.armoring_type === armoringType.armoring_type
              )
          );
          if (foundArmoringType) {
            return foundArmoringType.armoring_types.find(
              (arm) => arm.armoring_type === armoringType.armoring_type
            );
          } else {
            return {
              armoring_type: armoringType.armoring_type,
              length: 0,
              totalCable: 0,
            };
          }
        });

        return {
          nomor: `${index + 1}`,
          cable_type: cableType.cable_type,
          armoring_types: armoringTypesForCableType,
        };
      });

      res.json(modifiedCables);
    }
  });
};
