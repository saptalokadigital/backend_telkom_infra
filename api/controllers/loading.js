const loadingModel = require("../models/loading.models");
require("dotenv").config();

exports.addCableToLoading = async (req, res, next) => {
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
        // create a new loading
        const loading = new loadingModel({
            cables_id: req.body.cables_id,
        });
        // save loading in the database
        await loading.save();
        res.status(201).json({
            message: "Loading created successfully!",
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

exports.postLoading = async (req, res, next) => {
    let data = new loadingModel(req.body);
    const result = await data.save();
    res.send(result);
};

//get all loading
exports.getLoading = async (req, res, next) => {
    const loading = await loadingModel.find();
    res.send(loading);
};
