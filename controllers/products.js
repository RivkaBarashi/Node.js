
const Product = require('../models/Product');
const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');


function logDeletion(product) {
  const logPath = path.join(__dirname, '../logs/deletions.log');
  const message = `${new Date().toISOString()} - Product deleted: ${product.title} (ID: ${product._id})\n`;
  fs.appendFile(logPath, message, (err) => { if (err) console.error('Failed to write log', err); });
}


exports.createProduct = async (req, res, next) => {
  try {
    const { title, price, stock, category } = req.body;
    if (!title || price == null || stock == null || !category)
      return res.status(400).json({ message: 'All fields are required' });

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ message: 'Category not found' });

    const newProduct = new Product({ title, price, stock, category });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    next(err);
  }
};


exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true }).populate('category');
    res.json(products);
  } catch (err) {
    next(err);
  }
};


exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isActive: true }).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};


exports.updateProduct = async (req, res, next) => {
  try {
    const { title, price, stock, category } = req.body;
    if (category) {
      const catExists = await Category.findById(category);
      if (!catExists) return res.status(400).json({ message: 'Category not found' });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { title, price, stock, category },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Product not found or inactive' });
    res.json({ message: 'Product updated successfully', product: updated });
  } catch (err) {
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found or already deleted' });

    logDeletion(product);
    res.json({ message: 'Product deleted (Soft Delete)' });
  } catch (err) {
    next(err);
  }
};