import express, { RequestHandler, Router } from 'express'

import {
  checkCustomer,
  createCustomer,
  editCustomer,
  getCustomers
} from '../controllers/customersController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.post('/create', getDocs as RequestHandler, createCustomer as RequestHandler)

router.get('/get', getDocs as RequestHandler, getCustomers as RequestHandler)

router.post('/check', getDocs as RequestHandler, checkCustomer as RequestHandler)

router.get('/edit/:id', getDocs as RequestHandler, editCustomer as RequestHandler)

export default router
