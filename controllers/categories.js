const Category = require('../models/Category');
const Product = require('../models/Product');


exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return res.status(400).json({ message: 'Category already exists' });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    next(err);
  }
};


exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};


exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    
    const products = await Product.find({ category: categoryId, isActive: true });
    if (products.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category with active products' });
    }

    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};