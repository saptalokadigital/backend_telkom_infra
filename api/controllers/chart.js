const loadingModel = require("../models/loading.models");
const offloadingNewMaterialModel = require("../models/loading_new_material.models");
const spareCableModel = require("../models/spare_cable.models")
const spareKitsModel = require("../models/spare_kits")



exports.chartLoadingAndNewMaterial = async (req, res) => {
    try {
        const { from, to } = req.query;
        let obj = {
            loading: { status_loading: "Requested" },
            offloading_existing: { status_offloading_existing: "Requested" },
            new_material: { status: "Requested" }
        }
        let obj_approved = {
            loading: { status_loading: "Approved" },
            offloading_existing: { status_offloading_existing: "Approved" },
            new_material: { status: "Approved" }
        }
        let obj_draft = {
            loading: { status_loading: "Draft" },
            offloading_existing: { status_offloading_existing: "Draft" },
            new_material: { status: "Draft" }
        }

        if (from && to) {
            obj.loading.date_loading = { $gt: from, $lt: to };
            obj.offloading_existing.date_offloading_existing = { $gt: from, $lt: to }
            obj.new_material.date = { $gt: from, $lt: to }

            obj_approved.loading.date_loading = { $gt: from, $lt: to };
            obj_approved.offloading_existing.date_offloading_existing = { $gt: from, $lt: to }
            obj_approved.new_material.date = { $gt: from, $lt: to }

            obj_draft.loading.date_loading = { $gt: from, $lt: to };
            obj_draft.offloading_existing.date_offloading_existing = { $gt: from, $lt: to }
            obj_draft.new_material.date = { $gt: from, $lt: to }
        }

        console.log(obj)

        const loading = await loadingModel.find(obj.loading)
        const offloading_existing = await loadingModel.find(obj.offloading_existing)
        const new_material = await offloadingNewMaterialModel.find(obj.new_material)

        const loading_approved = await loadingModel.find(obj_approved.loading)
        const offloading_existing_approved = await loadingModel.find(obj_approved.offloading_existing)
        const new_material_approved = await offloadingNewMaterialModel.find(obj_approved.new_material)

        const loading_draft = await loadingModel.find(obj_draft.loading)
        const offloading_existing_draft = await loadingModel.find(obj_draft.offloading_existing)
        const new_material_draft = await offloadingNewMaterialModel.find(obj_draft.new_material)

        res.status(200).json({
            success: true,
            data: {
                loading: {
                    loading_requested: loading.length,
                    loading_approved: loading_approved.length,
                    loading_draft: loading_draft.length,
                    total_loading: loading.length + loading_approved.length+loading_draft.length,
                },
                offloading_existing: {
                    offloading_existing_requested: offloading_existing.length,
                    offloading_existing_approved: offloading_existing_approved.length,
                    offloading_existing_draft: offloading_existing_draft.length,
                    total_offloading_existing: offloading_existing.length + offloading_existing_approved.length+offloading_existing_draft.length,
                },
                offloading_new_material: {
                    offloading_new_material_requested: new_material.length,
                    offloading_new_material_approved: new_material_approved.length,
                    offloading_new_material_draft: new_material_draft.length,
                    total_offloading_new_material: new_material.length + new_material_approved.length+new_material_draft.length
                },


            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.status
        })
    }
}

exports.chartOccupancy = async (req, res) => {
    try {
        const cable_inner = await spareCableModel.aggregate([
            {
                $match: { tank: "inner" }
            },
            {
                $group: { _id: '$tank_location', length_meas: { $sum: '$length_meas' } }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        const cable_outer = await spareCableModel.aggregate([
            {
                $match: { tank: "outer" }
            },
            {
                $group: { _id: '$tank_location', length_meas: { $sum: '$length_meas' } }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        let arr = []
        for (let i = 0; i < cable_inner.length; i++) {
            let obj = {
                tank_location: "",
                tank: {
                    inner: 0,
                    outer: 0,
                    total: 0
                }
            }
            obj.tank_location = cable_inner[i]._id
            obj.tank.inner = cable_inner[i].length_meas
            obj.tank.total = cable_inner[i].length_meas
            cable_outer.forEach((a) => {
                if (obj.tank_location == a._id) {
                    obj.tank.outer = a.length_meas
                    obj.tank.total += a.length_meas
                }
            }
            )
            arr.push(obj)
        }
        let mark_exist_tank = []
        arr.forEach((a) => {
            mark_exist_tank.push(a.tank_location)
        })
        cable_outer.forEach((e) => {
            let obj = {
                tank_location: "",
                tank: {
                    inner: 0,
                    outer: 0,
                    total: 0
                }
            }
            if (!mark_exist_tank.includes(e._id)) {
                obj.tank_location = e._id
                obj.tank.outer = e.length_meas
                obj.tank.total = e.length_meas
                arr.push(obj)
            }
        })


        res.status(200).json({
            success: true,
            data: {
                tank: arr.sort(function(a, b) {
                    return a.tank.total - b.tank.total;
                  }),
                // cable_inner,
                // cable_outer
            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.status
        })
    }
}

exports.chartSpareKit = async (req, res) => {
    try {
        const spare_kits = await spareKitsModel.aggregate([
            {
                $group: { _id: "$part_number", qty: { $sum: "$qty" } }
            },
            {
                $sort: { qty: -1 }
            }

        ])

        res.status(200).json({
            success: true,
            data: spare_kits
        })
    } catch (err) {
        res.status(500).json({
            message: err.status
        })
    }
}