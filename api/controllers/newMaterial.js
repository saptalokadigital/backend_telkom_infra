const spareCableModel = require("../models/spare_cable.models");
const cableNewMaterial = require("../models/spare_cable_new_material.models");
const loadingNewMaterial = require("../models/loading_new_material.models");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.postSpareCableNewMaterial = async (req, res, next) => {
    try {
        let data = new cableNewMaterial(req.body);
        const result = await data.save();
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            // check if cable is already in cart
            if (user.cartCableNewMaterial.includes(result._id)) {
                return res.status(409).send({
                    message: "Cable already in cart.",
                });
            }
            await user.cartCableNewMaterial.push(result._id);
            await user.save();
            return res
                .status(200)
                .send({ message: "Cable New Material added to cart." });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to added spare cable data",
        });
    }
};

exports.getCartCablesNewMaterial = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            const cartCables = await cableNewMaterial.find({
                _id: { $in: user.cartCableNewMaterial },
            });
            return res.status(200).send(cartCables);
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to get cart new material data",
        });
    }
};

exports.deleteCartCablesNewMaterial = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            await user.cartCableNewMaterial.pull(req.params.id);
            await user.save();
            return res.status(200).send({
                message: "Cable deleted from cart.",
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to delete cart new material data",
        });
    }
};

exports.deleteAllCartCablesNewMaterial = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            user.cartCableNewMaterial = [];
            await user.save();
            return res.status(200).send({
                message: "All cables deleted from cart.",
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to delete all cart new material data",
        });
    }
};

exports.editCartCablesNewMaterial = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            const cable = await cableNewMaterial.findById(req.params.id);
            if (!user.cartCableNewMaterial.includes(cable._id)) {
                return res.status(409).send({
                    message: "Cable not in cart.",
                });
            }
            cable = req.body;
            await cable.save();
            return res.status(200).send({
                message: "Cable updated.",
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to update cart new material data",
        });
    }
};

exports.submitCartCablesNewMaterial = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        // create new loading new material
        let loadingNewMaterial = new loadingNewMaterial({
            _id: new mongoose.Types.ObjectId(),
            date: req.body.date,

            // add user id
            user: req.body.user,
        });

        if (!token)
            return res
                .status(401)
                .send({ auth: false, message: "No token provided." });
        jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
            if (err)
                return res.status(500).send({
                    auth: false,
                    message: "Failed to authenticate token inside.",
                });
            const user = await User.findById(decoded.userId);
            const cartCables = await cableNewMaterial.find({
                _id: { $in: user.cartCableNewMaterial },
            });
            // return res.status(200).send(cartCables);
            // loop through cartCables and save them to spareCable
            await Promise.all(
                cartCables.map(async (cable) => {
                    const cableObj = cable.toObject();
                    delete cableObj._id;
                    const tank = cableObj.tank;
                    const tank_location = cableObj.tank_location;
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
                    cableObj.tank_level = highest_tank + 1;
                    const spareCable = new spareCableModel(cableObj);
                    await spareCable.save();
                    loadingNewMaterial.cables_id.push(spareCable._id);
                    loadingNewMaterial.submitted_new_material.push(cable._id);
                })
            );
            await loadingNewMaterial.save();
            user.cartCableNewMaterial = [];
            await user.save();
            return res.status(200).send({
                message: "Cart submitted.",
            });
        });
    } catch (error) {
        return res.status(500).send({
            message: "Ooopps, Failed to submit cart new material data",
        });
    }
};
