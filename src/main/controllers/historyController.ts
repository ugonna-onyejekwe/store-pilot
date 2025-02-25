import { Request, Response } from 'express'
import db from '..'

// GET ALL HISTORY
export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const historyData = req.doc.history
    res.status(200).send(historyData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// EDIT SUPPLY
export const editSuppyStatus = async (req: Request, res: Response) => {
  try {
    const { checkoutId } = req.params
    const { status } = req.body

    const historyData = req.doc.history

    const data = historyData.find((i) => i.checkoutInfo.checkoutId === checkoutId)

    if (data) {
      data.checkoutInfo.supplyStatus = status
      data.checkoutInfo.modified = true
      data.checkoutInfo.modeifedAt = Date.now()
    } else {
      return res.status(404).json({ message: 'history not found' })
    }

    const updatedHistory = historyData.map((i) =>
      i.checkoutInfo.checkoutId === checkoutId ? data : i
    )

    await db.update({}, { $set: { history: updatedHistory } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error editing supply status', updateErr)
        res.status(500).json({ error: 'Failed to edit supply status' })
        return
      }

      res.status(200).json({ message: 'Update was successful' })

      return
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// EDIT PAYMENT
export const editPayment = async (req: Request, res: Response) => {
  try {
    const { checkoutId } = req.params
    const { amountPaid } = req.body

    const historyData = req.doc.history

    const data = historyData.find((i) => i.checkoutInfo.checkoutId === checkoutId)
    if (data) {
      data.checkoutInfo = {
        ...data.checkoutInfo,
        modified: true,
        modeifedAt: Date.now(),
        amountPaid: Number(data.checkoutInfo.amountPaid) + Number(amountPaid)
      }

      if (data.checkoutInfo.amountPaid >= data.checkoutInfo.sellingPrice) {
        data.checkoutInfo.paymentStatus = 'Full payment'
      } else {
        data.checkoutInfo.paymentStatus = 'Half payment'
      }
    } else {
      return res.status(404).json({ message: 'history not found' })
    }

    const updatedHistory = historyData.map((i) =>
      i.checkoutInfo.checkoutId === checkoutId ? data : i
    )

    await db.update({}, { $set: { history: updatedHistory } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error editing payment status', updateErr)
        res.status(500).json({ error: 'Failed to edit payment status' })
        return
      }

      res.status(200).json({ message: 'Update was successful' })

      return
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
