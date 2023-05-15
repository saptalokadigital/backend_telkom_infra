const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.updateUser = async (req, res, next) => {
  const updatedUserData = req.body;
  User.findOne(
    {
      $or: [{ email: req.body.email }, { username: req.body.username }],
    },
    async (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      const user = await User.findById(req.params.id);
      const userId = user._id.toString();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (result && result._id.toString() !== userId) {
        // if a document with the same username exists and it's not the one being updated
        return res.status(409).json({
          message: "Email exists / Username exists",
        });
        // handle the error and return a response as needed
      } else {
        // update the user's data
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            updatedUserData.password = hash;
            User.updateOne(
              { _id: userId },
              { $set: updatedUserData },
              (err, result) => {
                if (err) {
                  return res.status(409).json({
                    message: "Email exists / Username exists",
                  });
                }
                res.status(201).json({
                  message: "User updated successfuly..",
                  user: updatedUserData,
                });

                // return a response as needed
              }
            );
          }
        });
      }
    }
  );
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
