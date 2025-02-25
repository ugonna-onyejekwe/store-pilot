import express, { RequestHandler, Router } from 'express'
import {
  createCategory,
  deleteCategory,
  editCategory,
  formateCategory,
  getAllCategories,
  getSingleCategory,
  verifyCategoryName
} from '../controllers/categoryControler'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs as RequestHandler, getAllCategories as RequestHandler)
router.get('/single/:id', getDocs as RequestHandler, getSingleCategory as RequestHandler)
router.post(
  '/create',
  getDocs as RequestHandler,
  formateCategory as RequestHandler,
  createCategory as RequestHandler
)
router.patch(
  '/edit/:id',
  getDocs as RequestHandler,
  formateCategory as RequestHandler,
  editCategory as RequestHandler
)
router.post('/verifiy-name', getDocs as RequestHandler, verifyCategoryName as RequestHandler)
router.delete('/delete/:categoryId', getDocs as RequestHandler, deleteCategory as RequestHandler)

export default router
