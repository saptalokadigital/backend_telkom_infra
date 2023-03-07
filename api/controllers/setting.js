const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.updateUser = async (req, res, next) => {
    const { firstName, lastName, username, password, role } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields if new values are provided
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }

        if (username) {
            user.username = username;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (role) {
            user.role = role;
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};
