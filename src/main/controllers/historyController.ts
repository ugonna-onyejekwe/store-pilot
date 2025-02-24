import { Request, Response } from 'express'
import db from '..'

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

export const EditSuppyStatus = async (req: Request, res: Response) => {
  try {
    const { checkoutId } = req.params
    const { status } = req.body

    const historyData = req.doc.history

    const updatedHistory = historyData.map((i) =>
      i.checkoutInfo.checkoutId === checkoutId ? (i.checkoutInfo.supplyStatus = status) : i
    )

    // data.checkoutId = { ...data.checkoutInfo, supplyStatus: status }

    // res.status(200).send(historyData)

    await db.update({}, { $set: { history: updatedHistory } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error editing supply status', updateErr)
        res.status(500).json({ error: 'Failed to edit supply status' })
        return
      }

      res.status(200).json({ message: 'Update was successful' })

      return
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}
