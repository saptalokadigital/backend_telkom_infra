const loadingModel = require("../models/loading.models");
const spareCableModel = require("../models/spare_cable.models");
const submittedCableModel = require("../models/submitted_cable");
require("dotenv").config();

//get all loading
exports.getLoading = async (req, res, next) => {
    const loading = await loadingModel.find();
    res.send(loading);
};

exports.getLoadingById = async (req, res, next) => {
    const loadingId = req.params.loadingId;
    try {
        // find the loading document by id and populate the array cables_id field
        const loading = await loadingModel
            .findById(loadingId)
            .populate("cables_id");

        res.status(200).json({
            message: "Loading fetched successfully!",
            loading: loading,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};

exports.offloadingExisting = async (req, res, next) => {
    const loadingId = req.params.loadingId;
    const cableId = req.params.cableId;
    const length = req.body.length;
    try {
        // find the loading document by id and populate the array cables_id field
        const cableId = await submittedCableModel.findById(cableId);
        const result = await offloading.save();
        res.status(201).json({
            message: "Offloading created successfully!",
            offloading: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
};
