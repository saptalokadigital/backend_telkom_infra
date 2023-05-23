const KurSchema = require("../../models/kurs");
require("dotenv").config();

// if in database there is no data, then create new one
exports.createKurs = async (req, res, next) => {
  const kurs = new KurSchema({
    usdToIdr: req.body.usdToIdr,
  });
  kurs
    .save()
    .then((result) => {
      res.status(201).json({
        msg: "Kurs created successfuly..",
        sukses: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sukses: false,
        msg: "Ooopps, Failed to create kurs data",
        data: [],
      });
    });
};

// find one and then edit data
exports.editKurs = async (req, res, next) => {
  const kurs = new KurSchema({
    usdToIdr: req.body.usdToIdr,
  });
  KurSchema.findOne({}, {}, { sort: { _id: -1 } }) // Mengambil satu data terbaru berdasarkan urutan _id secara menurun (descending)
    .then((latestKurs) => {
      if (!latestKurs) {
        return res.status(404).json({
          sukses: false,
          msg: "No kurs data found",
          data: [],
        });
      }

      // Mengupdate data kurs yang ditemukan
      latestKurs.usdToIdr = kurs.usdToIdr;
      latestKurs
        .save()
        .then((result) => {
          res.status(201).json({
            msg: "Kurs updated successfully.",
            sukses: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            sukses: false,
            msg: "Oops, failed to update kurs data",
            data: [],
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        sukses: false,
        msg: "Oops, failed to find latest kurs data",
        data: [],
      });
    });
};
