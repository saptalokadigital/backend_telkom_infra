const mongoose = require("mongoose");
const User = require("../models/user");
const spareCableModel = require("../models/spare_cable.models");
const kitModel = require("../models/spare_kits");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Add cable to cart
exports.addToCartCable = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        cableId = req.body.cableId;

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
            if (user.cartCable.includes(cableId)) {
                return res.status(409).send({
                    message: "Cable already in cart.",
                });
            }

            await user.cartCable.push(cableId);
            await user.save();
            return res.status(200).send({ message: "Cable added to cart." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// Make a function to get all the cables in the cart
exports.getCartCables = async (req, res, next) => {
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
            const cartCables = await spareCableModel.find({
                _id: { $in: user.cartCable },
            });
            return res.status(200).send({ cartCables });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// Make a function to remove a cable from the cart
exports.removeFromCartCable = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        cableId = req.params.cableId;

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
            if (!user.cartCable.includes(cableId)) {
                return res.status(409).send({
                    message: "Cable not in cart.",
                });
            }

            await user.cartCable.pull(cableId);
            await user.save();
            return res
                .status(200)
                .send({ message: "Cable removed from cart." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// Make a function to remove all cables from the cart
exports.deleteAllCartCables = async (req, res, next) => {
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
            const updatedUser = await User.updateOne(
                { _id: decoded.userId },
                { $set: { cartCable: [] } }
            );
            console.log(updatedUser);
            return res.status(200).send({ message: "Cart cleared." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// Cart Kit
//make a function to add a kit to the cart
exports.addToCartKit = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        kitId = req.body.kitId;

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
            // check if kit is already in cart
            if (user.cartKit.includes(kitId)) {
                return res.status(409).send({
                    message: "Kit already in cart.",
                });
            }

            await user.cartKit.push(kitId);
            await user.save();
            return res.status(200).send({ message: "Kit added to cart." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};
// make a function to get all the kits in the cart
exports.getCartKits = async (req, res, next) => {
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
            const cartKits = await kitModel.find({
                _id: { $in: user.cartKit },
            });
            return res.status(200).send({ cartKits });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// make a function to remove a kit from the cart
exports.removeFromCartKit = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        kitId = req.params.kitId;

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

            // check if kit is already in cart
            if (!user.cartKit.includes(kitId)) {
                return res.status(409).send({
                    message: "Kit not in cart.",
                });
            }

            await user.cartKit.pull(kitId);
            await user.save();
            return res.status(200).send({ message: "Kit removed from cart." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// make a function to remove all kits from the cart
exports.deleteAllCartKits = async (req, res, next) => {
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
            const updatedUser = await User.updateOne(
                { _id: decoded.userId },
                { $set: { cartKit: [] } }
            );
            console.log(updatedUser);
            return res.status(200).send({ message: "Cart cleared." });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};

// Get Turn Over Cable From Cart
exports.getTurnOverCableFromCart = async (req, res, next) => {
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
            const cartCables = await spareCableModel.find({
                _id: { $in: user.cartCable },
            });

            // return res.status(200).send({ cartCables });
            // loop for every cable in cartCables

            const turnOver = await Promise.all(
                cartCables.map(async (cable) => {
                    return await spareCableModel
                        .find({
                            tank: cable.tank,
                            tank_location: cable.tank_location,
                            tank_level: { $gt: cable.tank_level },
                        })
                        .sort({ tank_level: -1 });
                })
            );
            return res.status(200).send({ turnOver });
        });
    } catch (error) {
        return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token outside.",
        });
    }
};
