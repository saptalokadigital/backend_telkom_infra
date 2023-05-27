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

// exports.offloadingExisting = async (req, res, next) => {
//     const loadingId = req.params.loadingId;
//     const cableId = req.params.cableId;
//     const length = req.body.length;
//     let highest_tank = 0;
//     try {
//         // find the loading document by id and populate the array cables_id field
//         const cable = await submittedCableModel.findById(cableId);
//         if (!cable) {
//             return res.status(404).json({
//                 message: "Cable not found!",
//             });
//         }
//         cable.is_offloaded = true;
//         const highestCableInTank = await spareCableModel
//             .find({
//                 tank_location: cable.tank_location,
//                 tank: cable.tank,
//             })
//             .sort({ tank_level: -1 })
//             .limit(1);
//         if (highestCableInTank.length > 0) {
//             highest_tank = highestCableInTank[0].tank_level;
//         }
//         let data = new spareCableModel({
//             no: cable.no,
//             tank_location: cable.tank_location,
//             tank: cable.tank,
//             depo_location: cable.depo_location,
//             label_id: cable.label_id,
//             system: cable.system,
//             cable_type: cable.cable_type,
//             manufacturer: cable.manufacturer,
//             armoring_type: cable.armoring_type,
//             core_type: cable.core_type,
//             length_report: length,
//             doc_reff: cable.doc_reff,
//             keterangan: cable.keterangan,
//             evidence: cable.evidence,
//             sigma_core: cable.sigma_core,
//             tanggal_validasi: cable.tanggal_validasi,
//             status_validasi: cable.status_validasi,
//             remark: cable.remark,
//             last_update: cable.last_update,
//             E_core: cable.E_core,

//             tank_level: highest_tank + 1,
//         });
//         return res.send(data);
//         res.status(201).json({
//             message: "Offloading created successfully!",
//             offloading: result,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Something went wrong!",
//         });
//     }
// };

exports.addCableToOffloading = async (req, res, next) => {
  const { cables_id, length_returned } = req.body;
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
    const offloading = await loadingModel.findById(req.params.loadingId);
    // add the new cable id to the array
    // check if the cable id is already in the array
    if (
      offloading.existing_cables_id.some(
        (cable) => cable._id.toString() === cables_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Cable already added to the offloading!",
        loading: offloading,
      });
    }
    // search for the cable document by id
    let submittedCable = await submittedCableModel.findById(cables_id);

    offloading.existing_cables_id.push(cables_id);
    // check if cable returned is more than cable length
    if (length_returned > submittedCable.length_report) {
      return res.status(400).json({
        message: "Cable returned is more than cable length!",
        loading: offloading,
      });
    }
    submittedCable.length_returned = length_returned;
    // save loading in the database
    await submittedCable.save();
    await offloading.save();
    res.status(201).json({
      message: "Cable added successfully!",
      loading: offloading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.offloadingSubmittion = async (req, res, next) => {
  try {
    const offloading = await loadingModel.findById(req.params.loadingId);
    if (!offloading) {
      return res.status(404).json({
        message: "Offloading not found!",
      });
    }
    //check if existing is empty
    if (loading.existing_cables_id.length === 0) {
      return res.status(400).json({
        message: "Loading cables is empty!",
      });
    }
    // move the cable from spare cable to submitted cable
    const cables = await spareCableModel.find({
      _id: { $in: loading.cables_id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.offloadingSubmittion = async (req, res, next) => {
  const loading = await loadingModel.findById(req.params.loadingId);
  if (!loading) {
    return res.status(404).json({
      message: "Loading not found!",
    });
  }

  //check if loading is empty
  if (loading.existing_cables_id.length === 0) {
    return res.status(400).json({
      message: "Offloading existing is empty!",
    });
  }

  // move the cable from existing to submitted existing cable
  const cables = await submittedCableModel.find({
    _id: { $in: loading.existing_cables_id },
  });

  // loop for every cable in cables
  await Promise.all(
    cables.map(async (cable) => {
      const cableObj = cable.toObject();
      delete cableObj._id;

      const spareCable = new spareCableModel(cableObj);
      spareCable.length_report = cable.length_returned;
      spareCable.length_meas = null;
      // check maximum tank level at the same tank and tank_location
      const highestCableInTank = await spareCableModel
        .find({
          tank_location: cable.tank_location,
          tank: cable.tank,
        })
        .sort({ tank_level: -1 })
        .limit(1);
      let highest_tank = 0;
      if (highestCableInTank.length > 0) {
        highest_tank = highestCableInTank[0].tank_level;
      }

      spareCable.tank_level = highest_tank + 1;
      // save spare cable in the database
      await spareCable.save();
      cable.is_offloaded = true;
      // add submitted cable to submitted_cables
      loading.submitted_existing_cables_id.push(spareCable);
    })
  );

  // take get now and then push to loading
  // Buat objek Date saat ini
  const now = new Date();

  // Dapatkan waktu saat ini dalam milidetik
  const currentTime = now.getTime();

  // Buat objek Date dengan waktu Jakarta
  const jakartaDate = new Date(currentTime);

  // Dapatkan tanggal, bulan, dan tahun dari jakartaDate
  const day = jakartaDate.getDate();
  const month = jakartaDate.getMonth() + 1;
  const year = jakartaDate.getFullYear();

  // Format tanggal dalam format "DD-MM-YYYY"
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  // Simpan dalam loading.submitted_date_loading
  loading.submitted_date_offloading = formattedDate;

  await loading.save();

  res.status(201).json({
    message: "Offloading submittion successfully!",
    loading: loading,
  });
};
