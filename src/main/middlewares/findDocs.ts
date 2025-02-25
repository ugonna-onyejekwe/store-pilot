import { NextFunction, Request, Response } from 'express'
import db from '..'

export const getDocs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await db.findOne({}, (err, doc) => {
      if (err) {
        console.error('Error finding document:', err)
        return res.status(500).json({ error: 'Database error' }) // Generic error message
      }
      if (!doc) {
        return res.status(404).json({ error: 'Document not found' }) // Or create it here if you prefer
      }
      req.doc = doc // Store the document in the request object for later use
      return next() // Proceed to the next middleware or route handler
    })
  } catch (err) {
    console.error('Error finding document:', err)
    return res.status(500).json({ error: 'Database error' })
  }
}
