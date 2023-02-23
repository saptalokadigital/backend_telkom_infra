const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

exports.getTank = (req, res, next) => {
    spareCableModel
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
