const express = require("express");
const router = express.Router();
const cartController = require("../controller/cart");

// Add a product to the cart
router.post("/addToCart", cartController.addToCart);

// Update the quantity of a product in the cart
router.put("/updateQuantity/:id", cartController.updateQuantity);

// Remove a product from the cart
router.delete("/removeFromCart/:id", cartController.removeFromCart);

// List all products in the cart
router.get("/listCartItems", cartController.listCartItems);

module.exports = router;
