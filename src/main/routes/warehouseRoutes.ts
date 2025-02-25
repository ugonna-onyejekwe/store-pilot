import express, { RequestHandler, Router } from 'express'

import { addWarehouse, deletewarehouse, getAllWarehouses } from '../controllers/warehouseController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs as RequestHandler, getAllWarehouses as RequestHandler)
router.post('/add', getDocs as RequestHandler, addWarehouse as RequestHandler)

router.delete('/:id', getDocs as RequestHandler, deletewarehouse as RequestHandler)

export default router
