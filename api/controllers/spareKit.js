const spareKitModel = require("../models/spare_kits");
require("dotenv").config();

exports.postSpareKit = async (req, res, next) => {
  let data = new spareKitModel(req.body);
  const result = await data.save();
  res.send(result);
};

exports.deleteSpareKit = async (req, res, next) => {
  console.log(req.params);
  let data = await spareKitModel.deleteOne(req.params);

  res.send(data);
};

exports.editSpareKit = async (req, res, next) => {
  console.log(req.params);
  let data = await spareKitModel.updateOne(req.params, { $set: req.body });
  res.send(data);
};

exports.getAll = (req, res, next) => {
  spareKitModel.find({}).exec(function (err, kits) {
    if (err) {
      res.send("error has occured");
    } else {
      console.log(kits);
      res.json(kits);
    }
  });
};

exports.getPage = (req, res, next) => {
  const page = parseInt(req.params.page, 10);
  spareKitModel
    .find({})
    .skip((page - 1) * 20)
    .limit(20)
    .exec(function (err, kits) {
      if (err) {
        res.send("error has occured");
      } else {
        console.log(kits);
        res.json(kits);
      }
    });
};

exports.getKitPopulate = (req, res, next) => {
  spareKitModel
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
    ])
    .exec(function (err, kits) {
      if (err) {
        res.send("error has occured");
      } else {
        console.log(kits);
        res.json(kits);
      }
    });
};
