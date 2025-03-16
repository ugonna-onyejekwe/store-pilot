import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

export const getAllWarehouses = async (req: Request, res: Response) => {
  try {
    const allWarehouses = req.doc.stores

    res.status(200).json(allWarehouses)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const addWarehouse = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const allwarehouse = req.doc.stores

    const newWarehouses = [
      {
        id: uuidv4(),
        name: name
      },
      ...allwarehouse
    ]

    await db.update({}, { $set: { stores: newWarehouses } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error adding store:', updateErr)
        res.status(500).json({ error: 'Failed to Add  store' })
        return
      }

      res.status(201).json({ message: 'store added' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const deletewarehouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const allWarehouse = req.doc.stores

    const newWarehouses = allWarehouse.filter((i) => i.id !== id)

    await db.update({}, { $set: { stores: newWarehouses } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error deleting store:', updateErr)
        res.status(500).json({ error: 'Failed to delete store' })
        return
      }

      res.status(200).json({ message: 'Store deleted successfully' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
