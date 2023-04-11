const spareCableModel = require("../models/spare_cable.models");
require("dotenv").config();

// exports.postSpareCable = async (req, res, next) => {
//     try {
//         let data = new spareCableModel(req.body);
//         return res.send(data);
//         const result = await data.save();
//         return res
//             .status(200)
//             .send({ result, message: "Added spare cable succesfully" });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Ooopps, Failed to added spare cable data",
//         });
//     }
// };

exports.deleteSpareCable = async (req, res, next) => {
    try {
        console.log(req.params);
        await spareCableModel.deleteOne(req.params);
        return res
            .status(200)
            .send({ message: "Deleted spare cable succesfully" });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to deleted spare cable data",
        });
    }
};

exports.editSpareCable = async (req, res, next) => {
    try {
        console.log(req.params);
        await spareCableModel.updateOne(req.params, { $set: req.body });
        return res
            .status(200)
            .send({ message: "Updated spare cable succesfully" });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to updated spare cable data",
        });
    }
};

exports.getAll = (req, res, next) => {
    spareCableModel.find({}).exec(function (err, cables) {
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
    spareCableModel
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

exports.getCablePopulate = (req, res, next) => {
    spareCableModel
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
                $lookup: {
                    from: "cable_types",
                    localField: "cable_type",
                    foreignField: "_id",
                    as: "cable_type",
                },
            },
            {
                $unwind: "$cable_type",
            },
            {
                $lookup: {
                    from: "armoring_types",
                    localField: "armoring_type",
                    foreignField: "_id",
                    as: "armoring_type",
                },
            },
            {
                $unwind: "$armoring_type",
            },
            {
                $lookup: {
                    from: "core_types",
                    localField: "core_type",
                    foreignField: "_id",
                    as: "core_type",
                },
            },
            {
                $unwind: "$core_type",
            },
            {
                $lookup: {
                    from: "manufacturers",
                    localField: "manufacturer",
                    foreignField: "_id",
                    as: "manufacturer",
                },
            },
            {
                $unwind: "$manufacturer",
            },
        ])
        .exec(function (err, cables) {
            if (err) {
                res.send("error has occured");
            } else {
                console.log(cables);
                res.json(cables);
            }
        });
};

exports.createSpareCable = async (req, res, next) => {
    const tank = req.body.tank;
    const tank_location = req.body.tank_location;

    let highest_tank = 0;

    if (tank && tank_location) {
        const highest_tank_cable = await spareCableModel
            .find({ tank: tank, tank_location: tank_location })
            .sort({ tank_level: -1 })
            .limit(1);
        if (highest_tank_cable.length > 0) {
            highest_tank = highest_tank_cable[0].tank_level;
        }
    }

    let data = new spareCableModel({
        ...req.body,
        tank_level: highest_tank + 1,
    });
    const result = await data.save();
    res.send(result);
};

exports.moveSpareCable = async (req, res, next) => {
    const cableId = req.params;
    const { toTank } = req.body;

    const cable = await spareCableModel.findOne({ _id: cableId });

    let fieldInTank = "";
    // return res.send(`${cable.tank === "outer"}`);
    if (!cable) {
        // do something if the cable is not found
        return res.status(404).send("Cable not found");
    }
    // return res.send(fieldInTank);

    const cablesInFromTank = await spareCableModel
        .find({
            tank: cable.tank,
            tank_location: cable.tank_location,
            tank_level: { $gt: cable.tank_level },
        })
        .sort({ tank_level: -1 });
    // return res.send(cablesInFromTank);
    if (cablesInFromTank.length > 0) {
        if (!toTank) {
            toTank =
                cable.tank_location === "TANK-2" ||
                cable.tank_location === "TANK-3" ||
                cable.tank_location === "TANK-10"
                    ? "TANK-6"
                    : "TANK-1";
        }

        const highestLevelCable = await spareCableModel
            .findOne({
                tank_location: toTank,
                tank: cable.tank,
            })
            .sort({ tank_level: -1 });
        let highestLevel = highestLevelCable ? highestLevelCable.tank_level : 0;

        for (const higherCable of cablesInFromTank) {
            await spareCableModel.updateOne(
                { _id: higherCable._id },
                {
                    $set: {
                        tank_location: toTank,
                        tank: higherCable.tank,
                        tank_level: highestLevel + 1,
                    },
                }
            );
            highestLevel++;
        }
    }

    // Update the current cable to the new tank and level
    const cablesInToTank = await spareCableModel
        .find({ tank: cable.tank, tank_location: toTank })

        .sort({ tank_level: -1 });
    const highestLevelCable = cablesInToTank[0];
    const highestLevel = highestLevelCable ? highestLevelCable.tank_level : 0;
    const newLevel = highestLevel + 1;
    await spareCableModel.updateOne(
        { _id: cableId },
        {
            $set: {
                tank_location: toTank,
                tank_level: newLevel,
                tank: fieldInTank,
            },
        }
    );
    res.send("Cable moved successfully");
};