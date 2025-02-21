import express, { RequestHandler, Router } from 'express'
import { getAllHistory } from '../controllers/historyController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllHistory as RequestHandler)

export default router
