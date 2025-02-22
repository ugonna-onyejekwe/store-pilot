import express, { RequestHandler, Router } from 'express'
import { addStore, deleteStore, getAllStoresLocation } from '../controllers/storeController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.get('/', getDocs, getAllStoresLocation as RequestHandler)
router.delete('/add', getDocs, addStore as RequestHandler)

router.delete('/:id', getDocs, deleteStore as RequestHandler)

export default router
