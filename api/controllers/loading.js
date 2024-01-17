/* eslint-disable no-undef */
const loadingModel = require("../models/loading.models");
const spareCableModel = require("../models/spare_cable.models");
const submittedCableModel = require("../models/submitted_cable");
const submittedKitModel = require("../models/submitted_kit");
const submittedTurnoverModel = require("../models/submitted_turnover");
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

exports.addCableToLoading = async (req, res) => {
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

exports.editCableInLoading = async (req, res) => {
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
exports.editKitInLoading = async (req, res) => {
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

exports.removeCableFromLoading = async (req, res) => {
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

exports.addKitToLoading = async (req, res) => {
  const { kits_id, unitPriceIdr, unitPriceUsd, qty } = req.body;
  if (kits_id > 0) {
    const isValidIds = comments.every((kits_id) =>
      mongoose.Types.ObjectId.isValid(kits_id)
    );
    if (!isValidIds) {
      return res.status(400).json({ error: "Invalid comment IDs" });
    }
  }

  try {
    //check length should be greater than 0
    if (qty <= 0) {
      return res.status(400).json({
        message: "Qty should be greater than 0!",
      });
    }
    // search for the loading document by id
    const loading = await loadingModel.findById(req.params.loadingId);
    // add the new kit id to the array
    // check if the kit id is already in the array
    if (
      loading.kits_id.some((kit) => kit.kit.toString() === kits_id.toString())
    ) {
      return res.status(400).json({
        message: "Kits already added to the loading!",
        loading: loading,
      });
    }
    // check if the kit is not in the stock
    if (!(await spareKitModel.findById(kits_id))) {
      return res.status(400).json({
        message: "Kits is not in the stock!",
      });
    }
    let kit = await spareKitModel.findById(kits_id);
    // check qty in stock is enough
    if (kit.qty < qty) {
      return res.status(400).json({
        message: "Qty pada kit tidak cukup!",
        qty_ready: kit.qty,
        qty_request: qty,
      });
    }
    kit.unitPriceIdr = unitPriceIdr;
    kit.unitPriceUsd = unitPriceUsd;
    await kit.save();
    loading.kits_id.push({ kit: kits_id, qty: qty });
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

exports.removeKitFromLoading = async (req, res) => {
  const { kits_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(kits_id)) {
    return res.status(400).json({ error: "Invalid kit ID" });
  }

  try {
    // Cari dokumen loading berdasarkan ID
    const loading = await loadingModel.findById(req.params.loadingId);

    // Periksa apakah kit ID ada dalam array kits_id
    const kitIndex = loading.kits_id.findIndex(
      (kit) => kit.kit.toString() === kits_id.toString()
    );

    if (kitIndex === -1) {
      return res.status(400).json({
        message: "Kit is not in the loading!",
      });
    }

    // Hapus kit dari array kits_id
    loading.kits_id.splice(kitIndex, 1);

    // Simpan perubahan pada objek loading
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

exports.deleteAllCableAndKitFromLoading = async (req, res) => {
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

exports.getLoadingById = async (req, res) => {
  const loadingId = req.params.loadingId;
  try {
    // find the loading document by id and populate the array cables_id field
    const loading = await loadingModel
      .findById(loadingId)
      .populate("status_loading")
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
      .populate({
        path: "kits_id",
        populate: {
          path: "kit",
        },
      })
      .populate({
        path: "kits_id.kit",
        populate: {
          path: "system",
        },
      })
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
      })
      .populate("existing_cables_id")
      .populate("submitted_existing_cables_id")
      .populate({
        path: "existing_cables_id",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate({
        path: "submitted_existing_cables_id",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate({
        path: "existing_kits_id",
        populate: {
          path: "kit",
        },
      })
      .populate({
        path: "existing_kits_id.kit",
        populate: {
          path: "system",
        },
      })
      .populate({
        path: "submitted_existing_kits_id",
        populate: {
          path: "system",
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

exports.postLoading = async (req, res) => {
  let data = new loadingModel(req.body);
  //search all no_bast in loading,sort it and get the last one then add 1

  // Buat objek Date saat ini
  const now = new Date();

  // Dapatkan waktu saat ini dalam milidetik
  const currentTime = now.getTime();

  // Buat objek Date dengan waktu Jakarta
  const jakartaDate = new Date(currentTime);

  // Dapatkan tanggal, bulan, dan tahun dari jakartaDate
  const month = jakartaDate.getMonth() + 1;
  const year = jakartaDate.getFullYear();
  data.month = month;
  data.year = year;
  const lastNoBastLoading = await loadingModel
    .find({ month: month, year: year })
    .sort({ first_digit_bast: -1 })
    .limit(1);

  if (lastNoBastLoading.length === 0) {
    data.first_digit_bast = 1;
  } else {
    const lastNoBast = lastNoBastLoading[0].first_digit_bast;
    data.first_digit_bast = lastNoBast + 1;
  }

  //search all no_bast in loading,sort it and get the last one then add 1
  const lastNoInvoiceLoading = await loadingModel
    .find({
      month: month,
      year: year,
    })
    .sort({ first_digit_invoice: -1 })
    .limit(1);

  //check lastNoBast undefined or not
  if (lastNoInvoiceLoading.length === 0) {
    data.first_digit_invoice = 1;
  } else {
    const lastNoInvoice = lastNoInvoiceLoading[0].first_digit_invoice;
    data.first_digit_invoice = lastNoInvoice + 1;
  }

  // format the no_bast to first_digit_bast/BAST_Loading/Month/Year
  // get month and year data from date now
  const romanMonth = convertToRoman(month);

  data.no_bast = `${data.first_digit_bast}/BAST_Loading/${romanMonth}/${year}`;
  data.no_invoice = `${data.first_digit_invoice}/TI/${romanMonth}/${year}`;

  data.status_offloading_existing = "";

  data.status_loading = "Draft";
  data.date_loading = new Date().toISOString();

  const result = await data.save();
  res.status(201).json({ success: true, id: result._id, loading: result });
};

//get all loading
exports.getLoading = async (req, res) => {
  const loading = await loadingModel.find().sort({ date_loading: -1 });

  res.send(loading);
};

//delete loading
exports.deleteLoading = async (req, res) => {
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

exports.getTurnoverByLoadingId = async (req, res) => {
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
      return res.status(200).json({
        message: "Loading cables is empty!",
        uniqueTurnOver: [],
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

exports.loadingSubmittion = async (req, res) => {
  try {
    const loading = await loadingModel.findById(req.params.loadingId);
    if (!loading) {
      return res.status(404).json({
        message: "Loading not found!",
      });
    }
    if (loading.submitted_date_loading != null) {
      return res.status(400).json({
        message: "Loading already submitted!",
      });
    }
    //check if loading is empty
    if (loading.cables_id.length === 0 && loading.kits_id.length === 0) {
      return res.status(400).json({
        message: "Loading cables and kits is empty!",
      });
    }

    if (loading.cables_id.length !== 0) {
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
    }

    if (loading.kits_id.length !== 0) {
      // move the kit from spare kit to submitted kit
      const kits = await spareKitModel.find({
        _id: { $in: loading.kits_id.map((kit) => kit.kit) }, // Menggunakan kit.kit sebagai kriteria pencarian
      });
      // loop for every kit in kits
      await Promise.all(
        kits.map(async (kit) => {
          const kitObj = kit.toObject();
          const qtyTaken = loading.kits_id.find(
            (c) => c.kit.toString() === kit._id.toString()
          ).qty;
          const kitQty = kitObj.qty;
          kitObj.qty_taken = qtyTaken;

          delete kitObj._id;

          // create new submitted kit
          const submittedKit = new submittedKitModel(kitObj);
          // save submitted kit in the database

          await submittedKit.save();
          // delete cable from spare cable
          if (qtyTaken < kitQty) {
            // subtract length_taken from cable length
            kit.qty = kitQty - qtyTaken;
            // update cable length in the database
            await spareKitModel.findByIdAndUpdate(kit._id, {
              qty: kit.qty,
            });
          } else if (qtyTaken === kitQty) {
            // delete cable from spare cable
            await spareKitModel.findByIdAndDelete(kit._id);
          } else {
            // return error message
            return res.status(400).json({ message: "Invalid qty taken" });
          }
          // add submitted kit to submitted_kits
          loading.submitted_kits.push(submittedKit);
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

    // Simpan dalam loading.submitted_date_loading
    loading.submitted_date_loading = formattedDate;
    loading.status_loading = "Approved";

    // remove the cable and kit id from the array
    loading.cables_id = [];
    loading.kits_id = [];

    // save loading in the database

    await loading.save();
    res.status(201).json({
      message: "Loading submittion successfully!",
      loading: loading,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addEvidenceToLoading = async (req, res) => {
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

exports.downloadFile = async (req, res) => {
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

exports.approveLoading = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await loadingModel.updateOne(
      { _id: id },
      {
        $set: {
          status_loading: status,
        },
      }
    );
    const data = await loadingModel.findOne({ _id: id });
    res.status(200).json({
      message: "Update offloading existing material status successfully!",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
