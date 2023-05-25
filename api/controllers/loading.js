const loadingModel = require("../models/loading.models");
const spareCableModel = require("../models/spare_cable.models");
const submittedCableModel = require("../models/submitted_cable");
const submittedKitModel = require("../models/submitted_kit");
const submittedTurnoverModel = require("../models/submitted_turnover");
const spareKitModel = require("../models/spare_kits");
const fs = require("fs");
require("dotenv").config();

exports.addCableToLoading = async (req, res, next) => {
  const { cables_id, priceIdr, priceUsd } = req.body;
  if (cables_id > 0) {
    const isValidIds = comments.every((cables_id) =>
      mongoose.Types.ObjectId.isValid(cables_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }

  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // add the new cable id to the array
    // check if the cable id is already in the array
    if (
      loading.cables_id.some(
        (cable) => cable._id.toString() === cables_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Cable already added to the loading!",
        loading: loading,
      });
    }
    // search for the cable document by id
    let cable = await spareCableModel.findById(cables_id);

    loading.cables_id.push(cables_id);
    cable.priceIdr = priceIdr;
    cable.priceUsd = priceUsd;
    await cable.save();
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Cable added successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.editCableInLoading = async (req, res, next) => {
  const { cables_id } = req.body;
  if (cables_id > 0) {
    const isValidIds = comments.every((cables_id) =>
      mongoose.Types.ObjectId.isValid(cables_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // edit the cable id in the array
    loading.cables_id = cables_id;
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Cable edited successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
exports.editKitInLoading = async (req, res, next) => {
  const { kits_id } = req.body;
  if (kits_id > 0) {
    const isValidIds = comments.every((kits_id) =>
      mongoose.Types.ObjectId.isValid(kits_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // edit the kit id in the array
    loading.kits_id = kits_id;
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Kit edited successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.removeCableFromLoading = async (req, res, next) => {
  const { cables_id } = req.body;
  if (cables_id > 0) {
    const isValidIds = comments.every((cables_id) =>
      mongoose.Types.ObjectId.isValid(cables_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // remove the cable id from the array
    // check if the cable id is already in the array
    if (
      !loading.cables_id.some(
        (cable) => cable._id.toString() === cables_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Cable is not in the loading!",
      });
    }

    loading.cables_id.pull(cables_id);
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Cable removed successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addKitToLoading = async (req, res, next) => {
  const { kits_id } = req.body;
  if (kits_id > 0) {
    const isValidIds = comments.every((kits_id) =>
      mongoose.Types.ObjectId.isValid(kits_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // add the new kit id to the array
    // check if the kit id is already in the array

    if (
      loading.kits_id.some((kit) => kit._id.toString() === kits_id.toString())
    ) {
      return res.status(400).json({
        message: "Kits already added to the loading!",
        loading: loading,
      });
    }

    loading.kits_id.push(kits_id);
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Kits added successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

//delete kit from loading
exports.removeKitFromLoading = async (req, res, next) => {
  const { kits_id } = req.body;
  if (kits_id > 0) {
    const isValidIds = comments.every((kits_id) =>
      mongoose.Types.ObjectId.isValid(kits_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // remove the kit id from the array
    // check if the kit id is not in the array

    if (
      !loading.kits_id.some((kit) => kit._id.toString() === kits_id.toString())
    ) {
      return res.status(400).json({
        message: "Kits is not in the loading!",
      });
    }
    loading.kits_id.pull(kits_id);
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Kit removed successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.deleteAllCableAndKitFromLoading = async (req, res, next) => {
  try {
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // remove the cable and kit id from the array
    loading.cables_id = [];
    loading.kits_id = [];
    // save loading in the database
    await loading.save();
    res.status(201).json({
      message: "Cables and kits removed successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.getLoadingById = async (req, res, next) => {
  const loadingId = req.params.loadingId;
  try {
    // find the loading document by id and populate the array cables_id field
    const loading = await loadingModel
      .findById(loadingId)
      .populate("diserahkan")
      .populate("diketahui")
      .populate("perusahaan")
      .populate("cables_id")
      .populate({
        path: "cables_id",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate("kits_id")
      .populate("submitted_kits")
      .populate({ path: "submitted_kits", populate: { path: "system" } })
      .populate("submitted_cables_turnover")
      .populate({
        path: "submitted_cables_turnover",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate("submitted_cables")
      .populate({
        path: "submitted_cables",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      });
    res.status(200).json({
      message: "Loading fetched successfully!",
      loading: [loading],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.postLoading = async (req, res, next) => {
  let data = new loadingModel(req.body);
  const result = await data.save();
  res.status(201).json({ success: true, id: result._id, loading: result });
};

//get all loading
exports.getLoading = async (req, res, next) => {
  const loading = await loadingModel.find();
  res.send(loading);
};

//delete loading
exports.deleteLoading = async (req, res, next) => {
  try {
    const loading = await loadingModel.findByIdAndDelete(req.params._id);
    if (!loading) {
      return res.status(404).json({
        message: "Loading not found!",
      });
    }

    res.status(201).json({
      message: "Loading deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.getTurnoverByLoadingId = async (req, res, next) => {
  try {
    const loading = await loadingModel.findById(req.params.loadingId);

    //check if loading is not found
    if (!loading) {
      return res.status(404).json({
        message: "Loading not found!",
      });
    }

    //check if loading is empty
    if (loading.cables_id.length === 0) {
      return res.status(400).json({
        message: "Loading cables is empty!",
      });
    }

    const cables = await spareCableModel.find({
      _id: { $in: loading.cables_id },
    });

    // loop for every cable in cartCables

    const turnOver = await Promise.all(
      cables.map(async (cable) => {
        return await spareCableModel
          .find({
            tank: cable.tank,
            tank_location: cable.tank_location,
            tank_level: { $gt: cable.tank_level },
          })
          .sort({ tank_level: -1 })
          .populate("system manufacturer cable_type armoring_type core_type");
      })
    );

    const uniqueTurnOver = turnOver.flat().reduce((acc, cable) => {
      if (!cables.some((c) => c.id === cable.id)) {
        if (!acc.some((uniqueCable) => uniqueCable.id === cable.id)) {
          acc.push(cable);
        }
      }
      return acc;
    }, []);

    return res.status(200).send({ uniqueTurnOver });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.loadingSubmittion = async (req, res, next) => {
  try {
    const loading = await loadingModel.findById(req.params.loadingId);
    if (!loading) {
      return res.status(404).json({
        message: "Loading not found!",
      });
    }

    //check if loading is empty
    if (loading.cables_id.length === 0) {
      return res.status(400).json({
        message: "Loading cables is empty!",
      });
    }
    // move the cable from spare cable to submitted cable
    const cables = await spareCableModel.find({
      _id: { $in: loading.cables_id },
    });

    const turnOver = await Promise.all(
      cables.map(async (cable) => {
        return await spareCableModel
          .find({
            tank: cable.tank,
            tank_location: cable.tank_location,
            tank_level: { $gt: cable.tank_level },
          })
          .sort({ tank_level: -1 });
      })
    );

    const uniqueTurnOver = turnOver.flat().reduce((acc, cable) => {
      if (!cables.some((c) => c.id === cable.id)) {
        if (!acc.some((uniqueCable) => uniqueCable.id === cable.id)) {
          acc.push(cable);
        }
      }
      return acc;
    }, []);
    // loop for every cable in turnOver and push it to submitted_turnover model
    await Promise.all(
      uniqueTurnOver.map(async (cable) => {
        const cableObj = cable.toObject();
        delete cableObj._id;
        const submittedTurnOver = new submittedTurnoverModel(cableObj);

        await submittedTurnOver.save();
        //add submitted turnover id to submitted_turnover
        loading.submitted_cables_turnover.push(submittedTurnOver);
      })
    );

    await Promise.all(
      turnOver.flat().map(async (cable) => {
        //update cable tank level
        await spareCableModel.updateOne(
          { _id: cable._id },
          {
            $set: {
              tank_level: cable.tank_level - 1,
            },
          }
        );
      })
    );

    // loop for every cable in cables
    await Promise.all(
      cables.map(async (cable) => {
        const cableObj = cable.toObject();
        delete cableObj._id;
        const submittedCable = new submittedCableModel(cableObj);
        // save submitted cable in the database
        await submittedCable.save();

        //delete cable from spare cable
        await spareCableModel.findByIdAndDelete(cable._id);
        // add submitted cable to submitted_cables
        loading.submitted_cables.push(submittedCable);
      })
    );
    await loading.save();
    // move the kit from spare kit to submitted kit
    const kits = await spareKitModel.find({
      _id: { $in: loading.kits_id },
    });
    // loop for every kit in kits
    await Promise.all(
      kits.map(async (kit) => {
        const kitObj = kit.toObject();
        delete kitObj._id;
        // create new submitted kit
        const submittedKit = new submittedKitModel(kitObj);
        // save submitted kit in the database
        await submittedKit.save();
        // delete kit from spare kit
        await spareKitModel.findByIdAndDelete(kit._id);
        // add submitted kit to submitted_kits
        loading.submitted_kits.push(submittedKit);
      })
    );

    // remove the cable and kit id from the array
    loading.cables_id = [];
    loading.kits_id = [];
    // save loading in the database

    await loading.save();
    res.status(201).json({
      message: "Loading submittion successfully!",
      loading: loading,
    });
  } catch (error) {}
};

exports.addEvidenceToLoading = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file!",
      });
    }

    const loading = await loadingModel.findById(req.params.loadingId);
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
};

exports.downloadFile = async (req, res, next) => {
  try {
    const loading = await loadingModel.findById(req.params.loadingId);
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
