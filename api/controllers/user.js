const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dashCableModel = require("../models/spare_cable.models");
require("dotenv").config();

// Create new user or Sign ups
exports.signUpNewUser = (req, res, next) => {
  User.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email exists / Username exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              role: req.body.role,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created successfuly..",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
//User Login
exports.userSignIn = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          status: false,
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(404).json({
            status: false,
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
              role: user[0].role,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1d",
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            status: true,
            token: token,
            role: user[0].role,
          });
        }
        res.status(404).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Delete User
exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.validate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err)
        return res.status(500).send({
          auth: false,
          message: "Failed to authenticate token.",
        });

      res.status(200).send(decoded);
    });
  } catch (error) {
    return res.status(500).send({
      auth: false,
      message: "Failed to authenticate token.",
    });
  }
};

exports.userProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    res.send(user);
  } catch (error) {
    return res.status(500).send({
      auth: false,
      message: "No one found",
    });
  }
};

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
