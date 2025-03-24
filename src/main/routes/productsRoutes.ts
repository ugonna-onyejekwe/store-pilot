import express, { RequestHandler, Router } from 'express'
import {
  checkout,
  createProduct,
  deleteProduct,
  // editProduct,
  getAllProducts,
  getSingleProduct,
  // returnProduct,
  verifyModel
} from '../controllers/productController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs as RequestHandler, getAllProducts as RequestHandler)
router.get('/:productId/:categoryId', getDocs as RequestHandler, getSingleProduct as RequestHandler)
router.post(
  '/create',
  getDocs as RequestHandler,

  createProduct as RequestHandler
)
router.post('/verify-model-name', getDocs as RequestHandler, verifyModel as RequestHandler)
router.post('/checkout', getDocs as RequestHandler, checkout as RequestHandler)
// router.post('/return-product', getDocs as RequestHandler, returnProduct as RequestHandler)
// router.patch('/edit', getDocs as RequestHandler, editProduct)
router.delete('/delete/:productId', getDocs as RequestHandler, deleteProduct)

export default router
