const KurSchema = require("../../models/kurs");
require("dotenv").config();

// if in database there is no data, then create new one
exports.createKurs = async (req, res, next) => {
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
      });
    });
};
