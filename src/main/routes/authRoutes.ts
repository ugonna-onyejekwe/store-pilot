import express, { RequestHandler, Router } from 'express'
import {
  adminResetPassword,
  Login,
  resetPassword,
  validateDevCredentails
} from '../controllers/authController'
import { getDocs } from '../middlewares/findDocs'

const router: Router = express.Router()

router.post('/validateDev', getDocs as RequestHandler, validateDevCredentails as RequestHandler)
router.post('/login', getDocs as RequestHandler, Login as RequestHandler)
router.patch('/reset-password', getDocs as RequestHandler, resetPassword as RequestHandler)
router.patch(
  '/admin-reset-password',
  getDocs as RequestHandler,
  adminResetPassword as RequestHandler
)

export default router
