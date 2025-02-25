import { Request, Response } from 'express'
import db from '..'

// LOGIN
export const Login = async (req: Request, res: Response) => {
  try {
    const { password } = req.body

    const authInfo = req.doc.authCredentials

    if (password.trim() === authInfo.password.trim()) {
      res.status(200).json({ message: 'Login successful' })
      return
    }

    res.status(400).json({ message: 'Wrong password' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// VALIDATE DEV CREDENTIALS
export const validateDevCredentails = async (req: Request, res: Response) => {
  try {
    const { developerPhoneNumber, developerName } = req.body

    const authInfo = req.doc.authCredentials

    if (
      developerPhoneNumber === authInfo.developerPhoneNumber &&
      developerName.toLowerCase() === authInfo.developerName.toLowerCase()
    ) {
      res.status(200).json({ message: 'Verified' })
      return
    }

    res.status(400).json({ message: 'Wrong info' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body

    if (!newPassword) return res.status(400).json({ message: 'New password nrequired' })

    const authInfo = req.doc.authCredentials

    const newAuthDetials = {
      ...authInfo,
      password: newPassword
    }

    return await db.update(
      {},
      { $set: { authCredentials: newAuthDetials } },
      {},
      (updateErr, _) => {
        if (updateErr) {
          console.error('Error updating auth details', updateErr)
          res.status(500).json({ error: 'Failed to create new password' })
          return
        }

        res.status(200).json({ message: 'Password reset successful' })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

//ADMIN RESET PASSWORD
export const adminResetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, oldPassword } = req.body

    if (!newPassword) return res.status(400).json({ message: 'New password nrequired' })

    const authInfo = req.doc.authCredentials

    if (oldPassword.trim() !== authInfo.password.trim()) {
      res.status(400).json({ message: 'Wrong password' })
      return
    }

    const newAuthDetials = {
      ...authInfo,
      password: newPassword
    }

    return await db.update(
      {},
      { $set: { authCredentials: newAuthDetials } },
      {},
      (updateErr, _) => {
        if (updateErr) {
          console.error('Error updating auth details', updateErr)
          res.status(500).json({ error: 'Failed to create new password' })
          return
        }

        return res.status(200).json({ message: 'Password reset successful' })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
