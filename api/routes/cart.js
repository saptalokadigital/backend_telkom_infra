const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const auth = require("../middleware/auth");

// Cart Cable
router.post("/", auth, cartController.addToCartCable);
router.get("/", auth, cartController.getCartCables);
router.delete("/delete/:cableId", auth, cartController.removeFromCartCable);
router.delete("/deleteAllCable", auth, cartController.deleteAllCartCables);

// Cart Kit
router.post("/addToCartKit", auth, cartController.addToCartKit);
router.get("/getCartKits", auth, cartController.getCartKits);
router.delete("/deleteKit/:kitId", auth, cartController.removeFromCartKit);
router.delete("/deleteAllKit", auth, cartController.deleteAllCartKits);

// Cart All
router.get("/getCartAll", auth, cartController.getCartAll);
router.delete("/deleteAllCart", auth, cartController.deleteAllCart);

// Cart Turn Over
router.get(
    "/getTurnOverCableFromCart",
    auth,
    cartController.getTurnOverCableFromCart
);

module.exports = router;
