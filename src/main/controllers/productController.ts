import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// CREATE PRODUCTS
export const createProduct = async (req: Request, res: Response) => {
  const {
    categoryId,
    model,
    totalQuantity,
    cartoonsPerProduct,
    sizes,
    subProducts,
    colors,
    designs
  } = req.body

  const allCategory = req.doc.category

  const productCategory = await allCategory.find((i) => i.id === categoryId)

  const { name: categoryName, hasSize, hasColor, hasDesign, hasSubProducts } = productCategory

  let newProduct = {
    category: {
      name: categoryName,
      id: categoryId
    },
    totalQuantity,
    cartoonsPerProduct,
    model,
    sizes,
    subProducts,
    colors,
    designs
  }

  //  Adding ID to each size
  if (hasSize) {
    const formatedSizes = sizes.map((i) => ({
      ...i,
      id: uuidv4()
    }))

    newProduct = { ...newProduct, sizes: formatedSizes }
  }

  //  Adding ID to each color
  if (hasColor) {
    const formatedColors = colors.map((i) => ({
      ...i,
      id: uuidv4()
    }))

    newProduct = { ...newProduct, colors: formatedColors }
  }

  //  Adding ID to each designs
  if (hasDesign) {
    const formatedDesigns = designs.map((i) => ({
      ...i,
      id: uuidv4()
    }))

    newProduct = { ...newProduct, designs: formatedDesigns }
  }

  // Adding ID to each designs
  if (hasSubProducts) {
    const formatedSubProducts = subProducts.map((i) => ({
      ...i,
      left: i.defaultQuantity,
      id: uuidv4()
    }))

    newProduct = { ...newProduct, subProducts: formatedSubProducts }
  }

  const allProduct = req.doc.products

  const updatedProductsList = [...allProduct, newProduct]

  await db.update({}, { $set: { products: updatedProductsList } }, {}, (updateErr, _) => {
    if (updateErr) {
      console.error('Error updating product list', updateErr)
      res.status(500).json({ error: 'Failed to create product' })
      return
    }

    res.status(201).json({ message: 'Product created successfly', data: newProduct })
  })
}

// GET ALL PRODUCTS
export const getAllProducts = async (req: Request, res: Response) => {}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req: Request, res: Response) => {}

// EDIT PRODUCT
export const editProduct = async (req: Request, res: Response) => {}
