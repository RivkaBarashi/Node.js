const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const categoriesController = require('../controllers/categories');

router.use(authenticate);
router.post('/', authorize(['admin']), categoriesController.createCategory);
router.get('/', categoriesController.getAllCategories);
router.delete('/:id', authorize(['admin']), categoriesController.deleteCategory);

module.exports = router;