import express from 'express';  
import { createNewProduct, deleteProductById, getProduct, getProductById, getProductsByCategory, getProductsByPriceRange, updateProductStarRating } from "../controllers/productController.js";
import authenticateToken from '../middlewares/authMiddleware.js';

const productsRouter = express.Router();

productsRouter.get('/', getProduct);
productsRouter.get('/category', getProductsByCategory);
productsRouter.get('/priceRange', getProductsByPriceRange);
productsRouter.post('/', createNewProduct);
productsRouter.put('/:id', authenticateToken, updateProductStarRating);
productsRouter.delete('/:id', authenticateToken, deleteProductById);
productsRouter.get('/:id', getProductById);

export { productsRouter };
