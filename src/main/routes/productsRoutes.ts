import express, { RequestHandler, Router } from 'express'
import {
  createProduct,
  deleteProduct,
  editProduct,
  formateProduct,
  getAllProducts,
  getSingleProduct,
  verifyModel
} from '../controllers/productController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllProducts as RequestHandler)
router.get('/:productId/:categoryId', getDocs, getSingleProduct as RequestHandler)
router.post('/create', getDocs, formateProduct as RequestHandler, createProduct)
router.post('/verify-model-name', getDocs, verifyModel as RequestHandler)
router.patch('/edit', getDocs, formateProduct as RequestHandler, editProduct)
router.delete('/delete/:productId', getDocs, deleteProduct)

export default router
