import express from 'express';  
import { getProduct, getProductById, getProductsByCategory } from "../controllers/productController.js"

const productsRouter = express.Router()
productsRouter.get('/', getProduct)
productsRouter.get('/category', getProductsByCategory);
productsRouter.get('/:id', getProductById)

export { productsRouter }