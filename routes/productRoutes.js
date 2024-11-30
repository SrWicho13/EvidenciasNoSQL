const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Asegúrate de que la ruta sea correcta

// Rutas para el CRUD de productos
router.post('/', productController.createProduct); // Crear producto
router.get('/:id', productController.getProduct); // Leer producto
router.put('/:id', productController.updateProduct); // Actualizar producto
router.delete('/:id', productController.deleteProduct); // Eliminar producto

module.exports = router;
