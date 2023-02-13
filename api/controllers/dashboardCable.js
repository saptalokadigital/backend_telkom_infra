const dashCableModel = require("../models/dashboard_cable.models");
require("dotenv").config();

exports.getAll = (req, res, next) => {
    dashCableModel.find({}).exec(function (err, cables) {
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
    dashCableModel
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
