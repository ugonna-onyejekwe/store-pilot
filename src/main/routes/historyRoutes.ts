import express, { RequestHandler, Router } from 'express'
import { editPayment, editSuppyStatus, getAllHistory } from '../controllers/historyController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllHistory as RequestHandler)

router.patch('/edit-supply-status/:checkoutId', getDocs, editSuppyStatus as RequestHandler)
router.patch('/edit-payment/:checkoutId', getDocs, editPayment as RequestHandler)

export default router
