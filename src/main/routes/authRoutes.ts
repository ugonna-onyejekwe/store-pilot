import express, { RequestHandler, Router } from 'express'
import {
  adminResetPassword,
  Login,
  resetPassword,
  validateDevCredentails
} from '../controllers/authController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.post('/validateDev', getDocs, validateDevCredentails as RequestHandler)
router.post('/login', getDocs, Login as RequestHandler)
router.patch('/reset-password', getDocs, resetPassword as RequestHandler)
router.patch('/admin-reset-password', getDocs, adminResetPassword as RequestHandler)

export default router
