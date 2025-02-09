import express, { RequestHandler, Router } from 'express'
import {
  createCategory,
  editCategory,
  formateCategory,
  getAllCategories,
  getSingleCategory,
  verifyCategoryName
} from '../controllers/categoryControler'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllCategories as RequestHandler)
router.get('/single/:id', getDocs, getSingleCategory as RequestHandler)
router.post('/create', getDocs, formateCategory as RequestHandler, createCategory as RequestHandler)
router.patch('/edit/:id', getDocs, formateCategory as RequestHandler, editCategory)
router.post('/verifiy-name', getDocs, verifyCategoryName as RequestHandler)

export default router
