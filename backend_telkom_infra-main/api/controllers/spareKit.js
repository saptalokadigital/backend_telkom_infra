const spareKitModel = require("../models/spare_kits");
require("dotenv").config();

exports.postSpareKit = (data) =>
  new Promise((resolve, reject) => {
    spareKitModel
      .create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Added Spare Kit succesfully",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Ooopps, Failed to added Spare Kit data",
        });
      });
  });

exports.deleteSpareKit = async (req, res) => {
  try {
    console.log(req.params);
    return res.status(200).send({ message: "Deleted spare kit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to deleted spare kit data",
    });
  }
};

exports.editSpareKit = async (req, res) => {
  try {
    console.log(req.params);
    await spareKitModel.updateOne(req.params, { $set: req.body });
    return res.status(200).send({ message: "Updated spare kit succesfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to updated spare kit data",
    });
  }
};

exports.getAll = (req, res) => {
  spareKitModel.find({}).exec(function (err, kits) {
    if (err) {
      res.send("error has occured");
    } else {
      console.log(kits);
      res.json(kits);
    }
  });
};

exports.getPage = (req, res) => {
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

exports.getKitPopulate = (req, res) => {
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
      {
        $project: {
          _id: 1,
          system: "$system.system",
          no: 1,
          location: 1,
          rak_number: 1,
          item_name: 1,
          part_number: 1,
          serial_number: 1,
          weight: 1,
          qty: 1,
          unit: 1,
          keterangan: 1,
          tanggal_transaksi: 1,
          aktivitas_transaksi: 1,
          from_to: 1,
          nomor_berita_acara: 1,
        },
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
