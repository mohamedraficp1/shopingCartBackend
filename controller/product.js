const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

exports.createProduct = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageFile = req.files.image; // Assuming the uploaded file is named 'image'

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath);

    // Create a new product with the Cloudinary image URL
    const product = await Product.create({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: result.secure_url,
      rating: req.body.rating,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.listProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;
    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
