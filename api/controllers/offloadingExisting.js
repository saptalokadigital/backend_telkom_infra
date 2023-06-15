/* eslint-disable no-undef */
const loadingModel = require("../models/loading.models");
const spareCableModel = require("../models/spare_cable.models");
const submittedCableModel = require("../models/submitted_cable");
const submittedKitModel = require("../models/submitted_kit");
const spareKitModel = require("../models/spare_kits");
const mongoose = require("mongoose");
require("dotenv").config();
function convertToRoman(num) {
  const romanNumerals = [
    { value: 1, numeral: "I" },
    { value: 2, numeral: "II" },
    { value: 3, numeral: "III" },
    { value: 4, numeral: "IV" },
    { value: 5, numeral: "V" },
    { value: 6, numeral: "VI" },
    { value: 7, numeral: "VII" },
    { value: 8, numeral: "VIII" },
    { value: 9, numeral: "IX" },
    { value: 10, numeral: "X" },
    { value: 11, numeral: "XI" },
    { value: 12, numeral: "XII" },
  ];

  for (let i = 0; i < romanNumerals.length; i++) {
    if (num === romanNumerals[i].value) {
      return romanNumerals[i].numeral;
    }
  }
  return num; // Jika angka tidak ada dalam rentang 1-12, kembalikan angka aslinya
}
//get all loading
exports.getLoading = async (req, res) => {
  const loading = await loadingModel.find();
  res.send(loading);
};

exports.getLoadingById = async (req, res) => {
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

// exports.offloadingExisting = async (req, res) => {
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

exports.addCableToOffloading = async (req, res) => {
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

exports.removeCableFromOffloading = async (req, res) => {
  const { cables_id } = req.body;
  try {
    // search for the loading document by id
    const offloading = await loadingModel.findById(req.params.loadingId);
    // check if the offloading is not submitted
    if (offloading.submitted_date_offloading != null) {
      return res.status(400).json({
        message: "Offloading already submitted!",
        submitted_date_offloading: offloading.submitted_date_offloading,
      });
    }
    // check if the cable id is already in the array
    if (
      !offloading.existing_cables_id.some(
        (cable) => cable._id.toString() === cables_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Cable not found in the offloading!",
        loading: offloading,
      });
    }

    // remove the cable id from the array
    offloading.existing_cables_id = offloading.existing_cables_id.filter(
      (cable) => cable._id.toString() !== cables_id.toString()
    );
    // save loading in the database
    await offloading.save();
    res.status(201).json({
      message: "Cable removed successfully!",
      offloading: offloading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addKitToOffloading = async (req, res) => {
  const { kits_id, qty } = req.body;

  try {
    // search for the loading document by id
    const offloading = await loadingModel.findById(req.params.loadingId);
    // add the new kit id to the array
    // check if the kit id is already in the array
    if (
      offloading.existing_kits_id.some(
        (kit) => kit.kit.toString() === kits_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Kit already added to the offloading!",
        loading: offloading,
      });
    }

    // check qty is more than 0
    if (qty <= 0) {
      return res.status(400).json({
        message: "Qty must be more than 0!",
        loading: offloading,
      });
    }

    // search for the kit document by id
    const submittedKit = await submittedKitModel.findById(kits_id);

    // check if qty is more than kit qty
    if (qty > submittedKit.qty) {
      return res.status(400).json({
        message: "Qty is more than kit qty!",
        qty: qty,
        kit_qty: submittedKit.qty,
      });
    }

    // add the kit id to the array
    offloading.existing_kits_id.push({ kit: kits_id, qty: qty });
    // save loading in the database
    await offloading.save();
    res.status(201).json({
      message: "Kit added successfully!",
      offloading: offloading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.removeKitFromOffloading = async (req, res) => {
  const { kits_id } = req.body;
  try {
    // search for the loading document by id
    const offloading = await loadingModel.findById(req.params.loadingId);
    // check if the offloading is not submitted
    if (offloading.submitted_date_offloading != null) {
      return res.status(400).json({
        message: "Offloading already submitted!",
        submitted_date_offloading: offloading.submitted_date_offloading,
      });
    }
    // check if the kit id is already in the array
    if (
      !offloading.existing_kits_id.some(
        (kit) => kit.kit.toString() === kits_id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Kit not found in the offloading!",
        loading: offloading,
      });
    }

    // remove the kit id from the array
    offloading.existing_kits_id = offloading.existing_kits_id.filter(
      (kit) => kit.kit.toString() !== kits_id.toString()
    );
    // save loading in the database
    await offloading.save();
    res.status(201).json({
      message: "Kit removed successfully!",
      offloading: offloading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.offloadingSubmittion = async (req, res) => {
  const loading = await loadingModel.findById(req.params.loadingId);
  if (!loading) {
    return res.status(404).json({
      message: "Loading not found!",
    });
  }

  //check if loading is empty
  if (
    loading.existing_cables_id.length === 0 &&
    loading.existing_kits_id.length === 0
  ) {
    return res.status(400).json({
      message: "Offloading existing is empty!",
    });
  }

  // check if the offloading is not submitted
  if (loading.submitted_date_offloading != null) {
    return res.status(400).json({
      message: "Offloading already submitted!",
      submitted_date_offloading: loading.submitted_date_offloading,
    });
  }

  if (loading.existing_cables_id.length > 0) {
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
  }

  if (loading.existing_kits_id.length > 0) {
    // move the kit from existing to submitted existing kit
    const kits = await submittedKitModel.find({
      _id: { $in: loading.existing_kits_id.map((kit) => kit.kit) }, // Menggunakan kit.kit sebagai kriteria pencarian
    });

    // loop for every kit in kits
    await Promise.all(
      kits.map(async (kit) => {
        const kitObj = kit.toObject();
        delete kitObj._id;

        const spareKit = new spareKitModel(kitObj);
        const qtyReturned = loading.existing_kits_id.find(
          (c) => c.kit.toString() === kit._id.toString()
        ).qty;
        spareKit.qty = qtyReturned;

        // save spare kit in the database
        await spareKit.save();
        // add submitted kit to submitted_kits
        loading.submitted_existing_kits_id.push(spareKit);
      })
    );
  }

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

  // BAST dan Invoice
  loading.month_offloading = month;
  loading.year_offloading = year;
  const lastNoBastLoading = await loadingModel
    .find({ month_offloading: month, year_offloading: year })
    .sort({ first_digit_bast_offloading: -1 })
    .limit(1);

  if (lastNoBastLoading.length === 0) {
    loading.first_digit_bast_offloading = 1;
  } else {
    const lastNoBast = lastNoBastLoading[0].first_digit_bast_offloading;
    loading.first_digit_bast_offloading = lastNoBast + 1;
  }

  //search all no_bast in loading,sort it and get the last one then add 1
  const lastNoInvoiceLoading = await loadingModel
    .find({
      month_offloading: month,
      year_offloading: year,
    })
    .sort({ first_digit_invoice_offloading: -1 })
    .limit(1);

  //check lastNoBast undefined or not
  if (lastNoInvoiceLoading.length === 0) {
    loading.first_digit_invoice_offloading = 1;
  } else {
    const lastNoInvoice =
      lastNoInvoiceLoading[0].first_digit_invoice_offloading;
    loading.first_digit_invoice_offloading = lastNoInvoice + 1;
  }

  // format the no_bast to first_digit_bast/BAST_Loading/Month/Year
  // get month and year loading from date now
  const romanMonth = convertToRoman(month);

  loading.no_bast_offloading = `${loading.first_digit_bast_offloading}/BAST_Off_Loading/${romanMonth}/${year}`;
  loading.no_invoice_offloading = `${loading.first_digit_invoice_offloading}/TI/${romanMonth}/${year}`;

  // Simpan dalam loading.submitted_date_loading
  loading.submitted_date_offloading = formattedDate;

  await loading.save();

  res.status(201).json({
    message: "Offloading submittion successfully!",
    loading: loading,
  });
};
