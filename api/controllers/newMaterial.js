const spareCableModel = require("../models/spare_cable.models");
const cableNewMaterial = require("../models/spare_cable_new_material.models");
const kitNewMaterial = require("../models/spare_kits_new_material.models");
const spareKitModel = require("../models/spare_kits");
const offloadingNewMaterialModel = require("../models/loading_new_material.models");

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

exports.createLoadingNewMaterial = async (req, res) => {
  let data = new offloadingNewMaterialModel(req.body);
  //search all no_bast in loading,sort it and get the last one then add 1

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

  data.date = formattedDate;

  data.month = month;
  data.year = year;
  const lastNoBastNewMaterial = await offloadingNewMaterialModel
    .find({
      month: month,
      year: year,
    })
    .sort({ first_digit_bast: -1 })
    .limit(1);

  if (lastNoBastNewMaterial.length === 0) {
    data.first_digit_bast = 1;
  } else {
    const lastNoBast = lastNoBastNewMaterial[0].first_digit_bast;
    data.first_digit_bast = lastNoBast + 1;
  }

  // format the no_bast to first_digit_bast/BAST_Loading/Month/Year
  // get month and year data from date now
  const romanMonth = convertToRoman(month);

  data.no_bast = `${data.first_digit_bast}/BAST_New_Material/${romanMonth}/${year}`;

  const result = await data.save();
  res.status(201).json({ success: true, id: result._id, loading: result });
};

exports.getOffloadingNewMaterialById = async (req, res) => {
  const offloadingId = req.params.offloadingId;
  try {
    const offloadingNewMaterial = await offloadingNewMaterialModel
      .findById(offloadingId)
      .populate("new_material_cables")
      .populate({
        path: "new_material_cables",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate("new_material_kits")
      .populate({
        path: "new_material_kits",
        populate: {
          path: "system",
        },
      })
      .populate({
        path: "submitted_new_material_cables_id_in_spare_cable",
        populate: {
          path: "system cable_type manufacturer armoring_type core_type",
        },
      })
      .populate("submitted_new_material_kits_id_in_spare_kits")
      .populate({
        path: "new_material_kits",
        populate: {
          path: "system",
        },
      });
    res.status(200).json([offloadingNewMaterial]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addCableToOffloadingNewMaterial = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    let data = new cableNewMaterial(req.body);
    const result = await data.save();

    const offloadingNewMaterial = await offloadingNewMaterialModel.findById(
      offloadingId
    );
    await offloadingNewMaterial.new_material_cables.push(result._id);

    await offloadingNewMaterial.save();

    res
      .status(201)
      .json({ success: true, offloadingNewMaterial: offloadingNewMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.getAllOffloadingNewMaterial = async (req, res) => {
  try {
    const offloadingNewMaterial = await offloadingNewMaterialModel
      .find()
      .select("-evidence");
    res.status(200).json(offloadingNewMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addKitToOffloadingNewMaterial = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    let data = new kitNewMaterial(req.body);
    const result = await data.save();

    const offloadingNewMaterial = await offloadingNewMaterialModel.findById(
      offloadingId
    );
    await offloadingNewMaterial.new_material_kits.push(result._id);

    await offloadingNewMaterial.save();

    res
      .status(201)
      .json({ success: true, offloadingNewMaterial: offloadingNewMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.removeCableFromOffloadingNewMaterial = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    const cableId = req.params.cableId;

    const offloadingNewMaterial = await offloadingNewMaterialModel.findById(
      offloadingId
    );

    await offloadingNewMaterial.new_material_cables.pull(cableId);

    await offloadingNewMaterial.save();

    // delete the cable from cableNewMaterial collection
    await cableNewMaterial.findByIdAndDelete(cableId);

    res
      .status(201)
      .json({ success: true, offloadingNewMaterial: offloadingNewMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.removeKitFromOffloadingNewMaterial = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    const kitId = req.params.kitId;

    const offloadingNewMaterial = await offloadingNewMaterialModel.findById(
      offloadingId
    );

    await offloadingNewMaterial.new_material_kits.pull(kitId);

    await offloadingNewMaterial.save();

    // delete the cable from cableNewMaterial collection
    await kitNewMaterial.findByIdAndDelete(kitId);

    res
      .status(201)
      .json({ success: true, offloadingNewMaterial: offloadingNewMaterial });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.offloadingNewMaterialSubmittion = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    const offloadingNewMaterial = await offloadingNewMaterialModel.findById(
      offloadingId
    );

    if (offloadingNewMaterial.isSubmitted === true) {
      return res.status(400).json({
        message: "This offloading has been submitted!",
      });
    }

    if (
      offloadingNewMaterial.new_material_cables.length === 0 &&
      offloadingNewMaterial.new_material_kits.length === 0
    ) {
      return res.status(400).json({
        message: "Offloading cables and is empty!",
      });
    }

    const cables = await cableNewMaterial.find({
      _id: { $in: offloadingNewMaterial.new_material_cables },
    });

    for (const cable of cables) {
      const cableObj = cable.toObject();
      delete cableObj._id;

      const tank = cableObj.tank;
      const tank_location = cableObj.tank_location;

      let highest_tank = 0;
      let tankLevelMap = new Map();
      let nextTankLevels = new Map();
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
      offloadingNewMaterial.submitted_new_material_cables_id_in_spare_cable.push(
        spareCable._id
      );
    }

    const kits = await kitNewMaterial.find({
      _id: { $in: offloadingNewMaterial.new_material_kits },
    });
    for (const kit of kits) {
      const kitObj = kit.toObject();
      delete kitObj._id;

      const newKit = new spareKitModel(kitObj);
      await newKit.save();
      offloadingNewMaterial.submitted_new_material_kits_id_in_spare_kits.push(
        newKit._id
      );
    }

    offloadingNewMaterial.isSubmitted = true;

    await offloadingNewMaterial.save();

    res.status(200).json({
      success: true,
      offloadingNewMaterial: offloadingNewMaterial,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.removeOffloadingById = async (req, res) => {
  try {
    const offloadingId = req.params.offloadingId;
    const offloading = await offloadingNewMaterialModel.findById(offloadingId);
    if (offloading.isSubmitted === true) {
      return res.status(400).json({
        message: "This offloading has been submitted! Cannot be deleted!",
      });
    }

    await offloadingNewMaterialModel.findByIdAndDelete(offloadingId);
    res.status(200).json({
      success: true,
      message: "Offloading deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};
