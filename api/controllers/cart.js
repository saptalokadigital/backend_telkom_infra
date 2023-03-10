const mongoose = require("mongoose");
const User = require("../models/user");
const spareCableModel = require("../models/spare_cable.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.addToCart = async (req, res, next) => {
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

// make a function to get all the cables in the cart
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

// make a function to remove a cable from the cart
exports.removeFromCart = async (req, res, next) => {
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

// make a function to remove all cables from the cart
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
