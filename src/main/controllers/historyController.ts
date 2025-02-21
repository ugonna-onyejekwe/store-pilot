import { Request, Response } from 'express'

// GET ALL HISTORY
export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const historyData = req.doc.history
    res.status(200).send(historyData)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}
