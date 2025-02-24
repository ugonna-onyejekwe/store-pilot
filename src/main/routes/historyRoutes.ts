import express, { RequestHandler, Router } from 'express'
import { EditSuppyStatus, getAllHistory } from '../controllers/historyController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllHistory as RequestHandler)
router.patch('/edit-supply-status/:checkoutId', getDocs, EditSuppyStatus as RequestHandler)

export default router
