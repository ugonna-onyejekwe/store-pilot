import { Request, Response } from 'express'

// GET ALL HISTORY
export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const { histories } = req.doc
    res.status(200).send(histories)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GET CUSTOMER HISTORY
export const customerHistory = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params

    const { histories } = req.doc

    const data = histories.filter((i) => i.checkoutInfo.customerId === customerId)

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// EDIT PAYMENT
// export const editPayment = async (req: Request, res: Response) => {
//   try {
//     const { checkoutId } = req.params
//     const { amountPaid } = req.body

//     const { histories } = req.doc

//     // await db.update({}, { $set: { history: updatedHistory } }, {}, (updateErr, _) => {
//     //   if (updateErr) {
//     //     console.error('Error editing payment status', updateErr)
//     //     res.status(500).json({ error: 'Failed to edit payment status' })
//     //     return
//     //   }

//     //   res.status(200).json({ message: 'Update was successful' })

//     //   return
//     // })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }
