import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

export const getAllStoresLocation = async (req: Request, res: Response) => {
  try {
    const allStores = req.doc.stores

    res.status(200).json(allStores)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

export const addStore = async (req: Request, res: Response) => {
  try {
    const { storeName } = req.body

    const allStores = req.doc.stores

    const newStores = [
      ...allStores,
      {
        id: uuidv4(),
        name: storeName
      }
    ]

    await db.update({}, { $set: { stores: newStores } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error creating store:', updateErr)
        res.status(500).json({ error: 'Failed to create store' })
        return
      }

      res.status(201).json({ message: 'New  store created' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

export const deleteStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.body

    const allStores = req.doc.stores

    const newStores = allStores.filter((i) => i.id !== storeId)

    await db.update({}, { $set: { stores: newStores } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error deleting store:', updateErr)
        res.status(500).json({ error: 'Failed to delete store' })
        return
      }

      res.status(200).json({ message: 'Store deleted successfully' })
    })
    res.status(200).json(allStores)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}
