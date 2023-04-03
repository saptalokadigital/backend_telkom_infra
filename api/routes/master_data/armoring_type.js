const express = require("express");
const router = express.Router();
const armoringTypeController = require("../../controllers/master_data/armoring_type");
const auth = require("../../middleware/auth");

// router.post("/", armoringTypeController.postArmoringType);
// router.get("/", armoringTypeController.getAllArmoringType);
// router.delete("/:_id", armoringTypeController.deleteArmoringType);
// router.put("/:_id", armoringTypeController.editArmoringType);

router.post("/create", (req, res) => {
    armoringTypeController
        .postArmoringType(req.body)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
    armoringTypeController
        .getAllArmoringType()
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.delete("/delete/:id", (req, res) => {
    armoringTypeController
        .deleteArmoringType(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.put("/edit/:id", (req, res) => {
    let data = req.body;
    console.log(data);
    armoringTypeController
        .editArmoringType(req.params.id, data)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

router.get("/get/:id", (req, res) => {
    armoringTypeController
        .getArmoringTypeById(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});
module.exports = router;
