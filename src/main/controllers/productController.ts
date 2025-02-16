import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// CREATE PRODUCTS
export const createProduct = async (req: Request, res: Response) => {
  try {
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
      designs,
      productId: uuidv4()
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
  } catch (error) {
    res.status(500).json(error)
  }
}

// GET ALL PRODUCTS || GET FILTERED PRODUCT
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query

    const productList = req.doc.products

    if (categoryId) {
      const filteredList = productList.filter((i) => i.category.id === categoryId)

      return res.status(200).json(filteredList)
    }

    res.status(200).json(productList)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId, categoryId } = req.params

    const productList = req.doc.products

    const product = productList.find((i) => i.productId === productId)

    if (!product) return res.status(404).json({ message: `Product not found` })

    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// EDIT PRODUCT
export const editProduct = async (req: Request, res: Response) => {
  try {
    const {
      model,
      totalQuantity,
      cartoonsPerProduct,
      sizes,
      subProducts,
      colors,
      designs,
      productId
    } = req.body

    const productList = req.doc.products

    let product = productList.find((i) => i.productId === productId)

    product = {
      ...product,
      totalQuantity,
      cartoonsPerProduct,
      model,
      sizes,
      subProducts,
      colors,
      designs
    }

    const updatedProductsList = productList.map((i) => {
      if (i.productId === productId) return product

      return i
    })

    await db.update({}, { $set: { products: updatedProductsList } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating product list', updateErr)
        res.status(500).json({ error: 'Failed to update product' })
        return
      }

      res.status(200).json({ message: 'Product updated successfly' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const productList = req.doc.products

    const upDatedProductList = productList.filter((i) => i.productId !== productId)

    await db.update({}, { $set: { products: upDatedProductList } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error deleting product', updateErr)
        res.status(500).json({ error: 'Failed to delete product' })
        return
      }

      res.status(200).json({ message: 'Product deleted successfly' })
    })
  } catch (error) {
    res.status(500).json(error)
  }
}
