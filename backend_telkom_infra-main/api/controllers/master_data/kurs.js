const KurSchema = require("../../models/kurs");
require("dotenv").config();

// if in database there is no data, then create new one
exports.createKurs = async (req, res) => {
  const kursData = {
    usdToIdr: req.body.usdToIdr,
  };

  KurSchema.findOneAndUpdate({}, kursData, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  })
    .then((result) => {
      res.status(201).json({
        msg: "Kurs created successfully.",
        sukses: true,
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sukses: false,
        msg: "Oops, failed to create kurs data.",
        data: [],
        err: err,
      });
    });
};

exports.getKurs = async (req, res) => {
  KurSchema.findOne()
    .sort({ _id: -1 })
    .then((result) => {
      res.status(200).json({
        msg: "Kurs retrieved successfully.",
        sukses: true,
        usd: result.usdToIdr,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sukses: false,
        msg: "Oops, failed to retrieve kurs data.",
        data: [],
        err: err,
      });
    });
};
