const inventoryModel = require("../models/inventory");
require("dotenv").config();

exports.getTank = (req, res, next) => {
    inventoryModel
        .find({
            $or: [
                {
                    tank_outer: `${req.params.tank}`,
                },
                {
                    tank_inner: `${req.params.tank}`,
                },
            ],
        })
        .exec(function (err, cables) {
            if (err) {
                res.send("error has occured");
            } else {
                console.log(cables);
                res.json(cables);
            }
        });
};
