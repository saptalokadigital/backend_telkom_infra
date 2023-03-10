const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

exports.postSpareCable = async (req, res, next) => {
  let data = new spareCableModel(req.body);
  const result = await data.save();
  res.send(result);
};

exports.deleteSpareCable = async (req, res, next) => {
  console.log(req.params);
  let data = await spareCableModel.deleteOne(req.params);

  res.send(data);
};

exports.editSpareCable = async (req, res, next) => {
  console.log(req.params);
  let data = await spareCableModel.updateOne(req.params, { $set: req.body });
  res.send(data);
};

exports.getAll = (req, res, next) => {
  spareCableModel.find({}).exec(function (err, cables) {
    if (err) {
      res.send("error has occured");
    } else {
      console.log(cables);
      res.json(cables);
    }
  });
};

exports.getPage = (req, res, next) => {
  const page = parseInt(req.params.page, 10);
  spareCableModel
    .find({})
    .skip((page - 1) * 20)
    .limit(20)
    .exec(function (err, cables) {
      if (err) {
        res.send("error has occured");
      } else {
        console.log(cables);
        res.json(cables);
      }
    });
};

exports.getCablePopulate = (req, res, next) => {
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
