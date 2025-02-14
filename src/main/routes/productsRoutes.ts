import express, { Router } from 'express'
import { createProduct } from '../controllers/productController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', () => {})
router.post('/create', getDocs, createProduct)

export default router
