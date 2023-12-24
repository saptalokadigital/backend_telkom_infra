const loadingModel = require("../models/loading.models");
const offloadingNewMaterialModel = require("../models/loading_new_material.models");
const spareCableModel = require("../models/spare_cable.models")



exports.chartLoadingAndNewMaterial=async(req,res)=>{
    try{
        const {from,to} = req.query;
        let obj = { 
            loading:{status_loading: "Requested"},
            offloading_existing: {status_offloading_existing: "Requested"},
            new_material: {status:"Requested"} 
        }
        let obj_approved = { 
            loading:{status_loading: "Approved"},
            offloading_existing: {status_offloading_existing: "Approved"},
            new_material: {status:"Approved"} 
        }

        if(from&&to){
            obj.loading.date_loading = {$gt:from,$lt:to} ;
            obj.offloading_existing.date_offloading_existing = {$gt:from,$lt:to}
            obj.new_material.date = {$gt:from,$lt:to}

            obj_approved.loading.date_loading = {$gt:from,$lt:to} ;
            obj_approved.offloading_existing.date_offloading_existing = {$gt:from,$lt:to}
            obj_approved.new_material.date = {$gt:from,$lt:to}
        }
        
        const loading = await loadingModel.find(obj.loading)
        const offloading_existing = await loadingModel.find(obj.offloading_existing)
        const new_material = await  offloadingNewMaterialModel.find(obj.new_material)

        const loading_approved = await loadingModel.find(obj_approved.loading)
        const offloading_existing_approved = await loadingModel.find(obj_approved.offloading_existing)
        const new_material_approved = await  offloadingNewMaterialModel.find(obj_approved.new_material)

        res.status(200).json({
            success: true,
            data: {
                loading_requested: loading.length,
                offloading_existing_requested: offloading_existing.length, 
                offloading_new_material_requested: new_material.length,
                loading_approved: loading_approved.length,
                offloading_existing_approved: offloading_existing_approved.length,
                offloading_new_material_approved: new_material_approved.length,
                total_loading: loading.length+loading_approved.length,
                total_offloading_existing: offloading_existing.length+offloading_existing_approved.length,
                total_offloading_new_material_approved:  new_material.length+new_material_approved.length
            }
        })

    }catch(err){
        res.status(500).json({
            message: err.status
        })
    }
} 

exports.chartOccupancy = async (req,res)=>{
    try{
       const cable_inner = await spareCableModel.aggregate([{
        $group: {_id:{tank_level: '$tank_level'},length: {$sum: '$length_mess'}}
       },
    { $match: {tank_location: "Inner"}}
    ])
    const cable_outer = await spareCableModel.aggregate([{
        $group: {_id:{tank_level: '$tank_level'},length: {$sum: '$length_mess'}}
       },
    { $match: {tank_location: "Outer"}}
    ])

    res.status(200).json({
        success: true,
        data: {
            cable_inner,
            cable_outer
        }
    })
     
    }catch(err){
        res.status(500).json({
            message: err.status
        })
    }
}