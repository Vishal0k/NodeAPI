import express from 'express';  
import { createNewProduct, getProduct, getProductById, getProductsByCategory, getProductsByPriceRange } from "../controllers/productController.js"

const productsRouter = express.Router()
productsRouter.get('/', getProduct)
productsRouter.get('/category', getProductsByCategory);
productsRouter.get('/priceRange', getProductsByPriceRange)
productsRouter.post('/', createNewProduct)
productsRouter.get('/:id', getProductById)


export { productsRouter }