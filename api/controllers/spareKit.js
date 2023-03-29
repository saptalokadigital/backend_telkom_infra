const spareKitModel = require("../models/spare_kits");
require("dotenv").config();

exports.postSpareKit = async (req, res, next) => {
  try {
    let data = new spareKitModel(req.body);
    const result = await data.save();
    return res.status(200).send({ result, message: "Added spare kit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to added spare kit data",
    });
  }
};

exports.deleteSpareKit = async (req, res, next) => {
  try {
    console.log(req.params);
    return res.status(200).send({ message: "Deleted spare kit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted spare kit data",
    });
  }
};

exports.editSpareKit = async (req, res, next) => {
  try {
    console.log(req.params);
    let data = await spareKitModel.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated spare kit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated spare kit data",
    });
  }
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
