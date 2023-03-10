const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../middleware/auth");

router.post("/", auth, cartController.addToCartCable);
router.get("/", auth, cartController.getCartCables);
router.delete("/delete/:cableId", auth, cartController.removeFromCartCable);
router.delete("/deleteAll", auth, cartController.deleteAllCartCables);

router.post("/addToCartKit", auth, cartController.addToCartKit);

module.exports = router;
