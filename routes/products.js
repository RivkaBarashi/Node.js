const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const productsController = require('../controllers/products');

router.use(authenticate);
router.post('/', authorize(['admin']), productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', authorize(['admin']), productsController.updateProduct);
router.delete('/:id', authorize(['admin']), productsController.deleteProduct);

module.exports = router;