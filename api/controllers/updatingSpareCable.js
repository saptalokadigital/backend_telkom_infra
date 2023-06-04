const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

exports.updateAllDataDateInCollectionSpareCable = async (req, res) => {
  const dateValue = new Date("2023-02-12");
  spareCableModel.updateMany(
    {},
    { $set: { last_update: dateValue } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};
