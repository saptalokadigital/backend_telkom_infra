const loadingModel = require("../models/loading.models");
const offloadingNewMaterialModel = require("../models/loading_new_material.models");


exports.chartLoadingAndNewMaterial=async(req,res)=>{
    try{

    }catch(err){
        res.status(500).json({
            message: err.status
        })
    }
} 