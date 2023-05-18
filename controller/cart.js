// controllers/cartController.js
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await Cart.create({ productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to the cart" });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item from the cart" });
  }
};

exports.listCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};
