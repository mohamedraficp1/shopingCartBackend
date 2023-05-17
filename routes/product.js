const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  listProductsByCategory,
  listCategories,
} = require("../controller/product");

// Add a new product
router.post("/", createProduct);

// Update an existing product
router.put("/editProduct/:id", updateProduct);

// Delete a product
router.delete("/deleteProduct/:id", deleteProduct);

// List all products
router.get("/getAllProduct", listProducts);

// List products of a particular category
router.get("/category/:categoryName", listProductsByCategory);

// List all categories
router.get("/categories", listCategories);

module.exports = router;
