const spareCableModel = require("../models/spare_cable.models");
const cableNewMaterial = require("../models/spare_cable_new_material.models");
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

exports.createLoadingNewMaterial = async (req, res, next) => {
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

exports.getOffloadingNewMaterialById = async (req, res, next) => {
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
      });
    res.status(200).json(offloadingNewMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

exports.addCableToOffloadingNewMaterial = async (req, res, next) => {
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
