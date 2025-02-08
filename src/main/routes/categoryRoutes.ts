import express, { RequestHandler, Router } from 'express'
import { createCategory, getAllCategories } from '../controllers/categoryControler'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllCategories as RequestHandler)
router.post('/create', getDocs, createCategory as RequestHandler)

export default router
