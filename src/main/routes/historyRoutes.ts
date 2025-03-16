import express, { RequestHandler, Router } from 'express'
import { customerHistory, editPayment, getAllHistory } from '../controllers/historyController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs as RequestHandler, getAllHistory as RequestHandler)

router.get(
  '/customer-history/:customerId',
  getDocs as RequestHandler,
  customerHistory as RequestHandler
)

router.patch('/edit-payment/:checkoutId', getDocs as RequestHandler, editPayment as RequestHandler)

export default router
