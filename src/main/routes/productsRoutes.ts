import express, { RequestHandler, Router } from 'express'
import {
  createProduct,
  editProduct,
  getAllProducts,
  getSingleProduct
} from '../controllers/productController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllProducts as RequestHandler)
router.get('/:productId/:categoryId', getDocs, getSingleProduct as RequestHandler)
router.post('/create', getDocs, createProduct)
router.patch('/edit', getDocs, editProduct)

export default router
