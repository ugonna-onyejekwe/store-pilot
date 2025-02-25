import express, { RequestHandler, Router } from 'express'
import { editPayment, editSuppyStatus, getAllHistory } from '../controllers/historyController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs as RequestHandler, getAllHistory as RequestHandler)

router.patch(
  '/edit-supply-status/:checkoutId',
  getDocs as RequestHandler,
  editSuppyStatus as RequestHandler
)
router.patch('/edit-payment/:checkoutId', getDocs as RequestHandler, editPayment as RequestHandler)

export default router
