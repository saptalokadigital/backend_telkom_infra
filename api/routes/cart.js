const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../middleware/auth");

// Cart Cable
router.post("/", auth, cartController.addToCartCable);
router.get("/", auth, cartController.getCartCables);
router.delete("/delete/:cableId", auth, cartController.removeFromCartCable);
router.delete("/deleteAll", auth, cartController.deleteAllCartCables);

// Cart Kit
router.post("/addToCartKit", auth, cartController.addToCartKit);
router.get("/getCartKits", auth, cartController.getCartKits);
router.delete("/deleteKit/:kitId", auth, cartController.removeFromCartKit);
router.delete("/deleteAllKit", auth, cartController.deleteAllCartKits);

module.exports = router;
