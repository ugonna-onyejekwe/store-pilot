import express, { RequestHandler, Router } from 'express'

import { addWarehouse, deletewarehouse, getAllWarehouses } from '../controllers/warehouseController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllWarehouses as RequestHandler)
router.post('/add', getDocs, addWarehouse as RequestHandler)

router.delete('/:id', getDocs, deletewarehouse as RequestHandler)

export default router
