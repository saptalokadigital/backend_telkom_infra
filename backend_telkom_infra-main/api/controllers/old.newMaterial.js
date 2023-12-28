const spareCableModel = require("../models/spare_cable.models");
const cableNewMaterial = require("../models/spare_cable_new_material.models");
const loadingNewMaterial = require("../models/loading_new_material.models");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.postSpareCableNewMaterial = async (req, res) => {
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

exports.getCartCablesNewMaterial = async (req, res) => {
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

exports.deleteCartCablesNewMaterial = async (req, res) => {
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

exports.deleteAllCartCablesNewMaterial = async (req, res) => {
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

exports.editCartCablesNewMaterial = async (req, res) => {
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
      let cable = await cableNewMaterial.findById(req.params.id);
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

exports.submitCartCablesNewMaterial = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    let newLoadingMaterial = new loadingNewMaterial({
      date: req.body.date,

      // add user id
      user: req.body.user,
    });
    jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
      if (err) {
        return res.status(500).send({
          auth: false,
          message: "Failed to authenticate token inside.",
        });
      }

      const user = await User.findById(decoded.userId);

      const cartCables = await cableNewMaterial.find({
        _id: { $in: user.cartCableNewMaterial },
      });

      let tankLevelMap = new Map();
      let nextTankLevels = new Map();

      for (const cable of cartCables) {
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

          if (tankLevelMap.has(tank_location)) {
            nextTankLevels.set(
              tank_location,
              tankLevelMap.get(tank_location) + 1
            );
          } else {
            nextTankLevels.set(tank_location, highest_tank + 1);
          }
          tankLevelMap.set(tank_location, nextTankLevels.get(tank_location));
        }

        cableObj.tank_level = nextTankLevels.get(tank_location);
        const spareCable = new spareCableModel(cableObj);
        await spareCable.save();
        newLoadingMaterial.cables_id.push(spareCable._id);
        newLoadingMaterial.submitted_new_material.push(cable._id);
      }

      await newLoadingMaterial.save();
      user.cartCableNewMaterial = [];
      await user.save();

      return res.status(200).send({ message: "Cart submitted." });
    });
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to submit cart new material data",
    });
  }
};

exports.getAllSpareCableNewMaterial = async (req, res) => {
  try {
    const loading = await loadingNewMaterial.find();
    return res.status(200).send(loading);
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to get all loading new material data",
    });
  }
};

exports.getSpareCableNewMaterialById = async (req, res) => {
  try {
    const loading = await loadingNewMaterial.findById(req.params._id);
    return res.status(200).send(loading);
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to get loading new material data",
    });
  }
};

exports.uploadEvidenceSpareCableNewMaterial = async (req, res) => {
  try {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please upload a file!",
        });
      }

      const loading = await loadingNewMaterial.findById(req.params.loadingId);
      if (!loading) {
        return res.status(404).json({
          message: "Loading not found!",
        });
      }

      const { buffer, mimetype, originalname } = req.file;
      const file = {
        data: buffer,
        contentType: mimetype,
        originalName: originalname,
      };

      loading.evidence = file;
      await loading.save();

      res.status(201).json({
        message: "Evidence added successfully!",
        loading: loading,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Ooopps, Failed to upload evidence new material data",
    });
  }
};

exports.downloadEvidenceSpareCableNewMaterial = async (req, res) => {
  try {
    const loading = await loadingNewMaterial.findById(req.params.loadingId);
    if (!loading) {
      return res.status(404).json({
        message: "Loading not found!",
      });
    }

    const file = loading.evidence;
    if (!file) {
      return res.status(404).json({
        message: "File not found!",
      });
    }

    // Set headers
    res.setHeader("Content-Type", file.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.originalName}`
    );

    // Send buffer as response
    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
