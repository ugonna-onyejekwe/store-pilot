import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// save customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { customerName }: createNewCustomerBody = req.body

    const { customers } = req.doc

    if (!customerName) {
      res.status(403).json({ message: 'Customer name required ' })
      return
    }

    const newCustomer = {
      name: customerName,
      id: uuidv4()
    }

    const UpdatedcustomerList = [newCustomer, ...customers]

    return await db.update({}, { $set: { customers: UpdatedcustomerList } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating customers list:', updateErr)
        return res.status(500).json({ error: 'Failed to create customer' })
      }

      return res.status(200).json({ message: 'Customer created', data: newCustomer })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get all customer
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const { customers } = req.doc
    const { customerId } = req.query

    if (customerId) {
      const customer = customers.find((i) => i.id === customerId)

      if (!customer) {
        res.status(404).json({ message: 'Customer does not exist' })
      }

      res.status(200).json(customer)

      return
    }

    res.status(200).json(customers)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// check customer name
export const checkCustomer = async (req: Request, res: Response) => {
  try {
    const { customerName } = req.body

    const { customers } = req.doc

    const customerExist = customers.find((i) => i.name === customerName)

    if (customerExist) {
      res.status(409).json({ message: `Customer with name ${customerName} already exist` })

      return
    }

    res.status(200).json({ message: 'Customer name is available for use' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// edit customer
export const editCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params
    const { customerName } = req.params
    const { customers } = req.doc

    const customer = customers.find((i) => i.id === customerId)

    if (!customer) {
      res.status(404).json({ message: 'Customer does not exist' })
    }

    const UpdatedcustomerList = customers.map((i) =>
      i.id === customerId ? { ...i, name: customerName } : i
    )

    return await db.update({}, { $set: { customers: UpdatedcustomerList } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating customers list:', updateErr)
        return res.status(500).json({ error: 'Failed to edit customer' })
      }

      return res.status(200).json({ message: 'Customer edited' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
