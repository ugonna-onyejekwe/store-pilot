import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

export const getAllWarehouses = async (req: Request, res: Response) => {
  try {
    const allWarehouses = req.doc.warehouses

    res.status(200).json(allWarehouses)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

export const addWarehouse = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const allwarehouse = req.doc.warehouses

    const newWarehouses = [
      {
        id: uuidv4(),
        name: name
      },
      ...allwarehouse
    ]

    await db.update({}, { $set: { warehouses: newWarehouses } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error storing warehouse:', updateErr)
        res.status(500).json({ error: 'Failed to store warehouse' })
        return
      }

      res.status(201).json({ message: 'Warehouse added' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

export const deletewarehouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const allWarehouse = req.doc.warehouses

    const newWarehouses = allWarehouse.filter((i) => i.id !== id)

    await db.update({}, { $set: { warehouses: newWarehouses } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error deleting warehouse:', updateErr)
        res.status(500).json({ error: 'Failed to delete warehouse' })
        return
      }

      res.status(200).json({ message: 'Warehouse deleted successfully' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}
