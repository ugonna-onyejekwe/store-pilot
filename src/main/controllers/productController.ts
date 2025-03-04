import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// FORMATE PRODUCT iNFO
export const formateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return next()
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// CREATE PRODUCTS
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      categoryName,
      categoryId,
      subCategory,
      model,
      actionType,
      hasModel,
      hasSubProducts,
      hasSubCategory,
      hasColors,
      totalQuantity,
      cartoonsPerSet,
      subProducts,
      colors,
      designs
    }: CreateProductRequestBody = req.body

    const allCategories = req.doc.categories
    const allProducts = req.doc.products

    // updateProductFn
    const updateProductListFn = async (updatedProductsList, newProduct) => {
      return await db.update(
        {},
        { $set: { products: updatedProductsList } },
        {},
        (updateErr, _) => {
          if (updateErr) {
            console.error('Error updating product list', updateErr)
            res.status(500).json({ error: 'Failed to update product list' })
            return
          }

          res.status(201).json({ message: 'Product list updated  successfully', data: newProduct })
        }
      )
    }

    const newProduct = {
      productId: uuidv4()
    }

    const updatedProductsList = [...allProducts, newProduct]

    return await db.update({}, { $set: { products: updatedProductsList } }, {}, (updateErr, _) => {
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
    const { categoryId, model, subCategoryName } = req.query as {
      categoryId: string
      model: string
      subCategoryName: string
    }

    const productList = req.doc.products

    if (model) {
      const filteredList = productList.filter((i) => i.model.toLowerCase() === model.toLowerCase())

      res.status(200).json(filteredList)
      return
    }

    if (categoryId) {
      let filteredList = productList.filter((i) => i.category.id === categoryId)

      if (subCategoryName) {
        filteredList = filteredList.filter(
          (i) => i.subCategoryName.toLowerCase() === subCategoryName.toLowerCase()
        )
      }

      res.status(200).json(filteredList)

      return
    }

    res.status(200).json(productList)
  } catch (error) {
    res.status(500).json(error)
  }
}

// GET SINGLE PRODUCT
export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const productList = req.doc.products

    const product = productList.find((i) => i.productId === productId)

    if (!product) {
      res.status(404).json({ message: `Product not found` })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// EDIT PRODUCT
export const editProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body

    const { productInfo } = req

    const productList = req.doc.products

    let product = productList.find((i) => i.productId === productId)

    // @ts-ignore: Gives error of incompactible
    product = {
      ...product,
      ...productInfo
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

      res.status(200).json({ message: 'Product updated successfly', data: product })
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

// VERIFY PRODUCT MODEL
export const verifyModel = async (req: Request, res: Response) => {
  const { model, categoryId } = req.body

  const productList = req.doc.products

  const alreadyExist = productList.find(
    (i) => i.model.toLowerCase() === model.toLowerCase() && i.category.id === categoryId
  )

  if (alreadyExist) {
    res
      .status(409)
      .json({ message: `A product with this Model - ${model} already exist, you can edit it.` })

    return
  }

  res.status(200).json({ message: 'Model is available' })
}

// CHECKOUT
export const checkout = async (req: Request, res: Response) => {
  try {
    const {
      listOfProducts,
      checkoutInfo
    }: {
      listOfProducts: Checkout__ProductList
      checkoutInfo: CheckoutInfo
    } = req.body

    const categoriesData = req.doc.category
    const productsData = req.doc.products
    const historyData = req.doc.history

    const updateProductFn = async (upDatedProductList) => {
      await db.update({}, { $set: { products: upDatedProductList } }, {}, (updateErr, _) => {
        if (updateErr) {
          console.error('Error checking out', updateErr)
          res.status(500).json({ error: 'Failed to  checkout' })
          return
        }

        return
      })
    }

    listOfProducts.map((product) => {
      if (product.typeOfSale.trim() !== 'sell leftOver') {
        const productCategory = categoriesData.find((i) => i.id === product.category.id)

        if (!productCategory) return res.status(404).json({ message: 'Product category not found' })

        const productDetails = productsData.find((i) => i.productId === product.productId)

        if (!productDetails) return res.status(404).json({ message: 'Product not found' })

        const { hasColor, hasDesign, hasSize, hasSubProducts } = productCategory

        // Decrease product main quantity
        productDetails.totalQuantity =
          Number(productDetails.totalQuantity) - Number(product.quantity)

        // Decrease design qunatity if has design
        if (hasDesign) {
          productDetails.designs = productDetails.designs.map((i) =>
            i.id === product.design
              ? {
                  ...i,
                  quantity:
                    Number(i.quantity) - Number(product.quantity) < 0
                      ? 0
                      : Number(i.quantity) - Number(product.quantity)
                }
              : i
          )
        }

        // Decrease size qunatity if has size
        if (hasSize) {
          productDetails.sizes = productDetails.sizes.map((i) =>
            i.id === product.size
              ? {
                  ...i,
                  quantity:
                    Number(i.quantity) - Number(product.quantity) < 0
                      ? 0
                      : Number(i.quantity) - Number(product.quantity)
                }
              : i
          )
        }

        // Decrease color qunatity if has color
        if (hasColor) {
          productDetails.colors = productDetails.colors.map((i) =>
            i.id === product.color
              ? {
                  ...i,
                  quantity:
                    Number(i.quantity) - Number(product.quantity) < 0
                      ? 0
                      : Number(i.quantity) - Number(product.quantity)
                }
              : i
          )
        }

        // Check if only part of the product is sold
        if (hasSubProducts && product.typeOfSale.toLowerCase().trim() === 'sell part') {
          product.subproducts = product.subproducts.map((i) => ({
            ...i,
            left: Number(i.defaultQuantity) - Number(i.sellQuantity)
          }))

          // check for remaining product
          const remainingSubproducts = product.subproducts.filter((i) => i.left !== 0)

          // update product detials if there is no remaining product
          if (remainingSubproducts.length === 0) {
            const UpdatedProduct = productsData.map((i) =>
              i.productId === product.productId ? productDetails : i
            )
            updateProductFn(UpdatedProduct)
            return
          }
          // Formate list to remove sell quantity property
          const formatedRemainingSubproducts = remainingSubproducts.map((i) => ({
            name: i.name,
            defaultQuantity: i.defaultQuantity,
            id: i.id,
            left: i.left
          }))

          // getting color
          const color = productDetails.colors.find((i) => i.id === product.color)

          // getting design
          const design = productDetails.designs.find((i) => i.id === product.design)

          // getting color
          const size = productDetails.sizes.find((i) => i.id === product.size)

          const formatedLeftOver = {
            category: productDetails.category,
            productId: productDetails.productId,
            model: productDetails.model,
            size: size?.name ?? '',
            color: color?.name ?? '',
            design: design?.name ?? '',
            leftOverId: uuidv4(),
            subproducts: [...formatedRemainingSubproducts]
          }

          const UpdatedProduct = productsData.map((i) =>
            i.productId === product.productId
              ? {
                  ...productDetails,
                  leftOver: productDetails.leftOver
                    ? [...productDetails.leftOver, formatedLeftOver]
                    : [formatedLeftOver]
                }
              : i
          )

          return updateProductFn(UpdatedProduct)
        }

        const UpdatedProduct = productsData.map((i) =>
          i.productId === product.productId ? productDetails : i
        )

        return updateProductFn(UpdatedProduct)
      } else if (product.typeOfSale.trim() === 'sell leftOver') {
        const { leftOverId, productId } = product

        const productDetails = productsData.find((i) => i.productId === productId)

        if (!productDetails) return res.status(404).json({ message: 'Product not found' })

        const leftOverList = productDetails?.leftOver?.find((i) => i.leftOverId === leftOverId)

        if (!leftOverList) return res.status(404).json({ message: 'Product not found' })

        product.subproducts = product.subproducts.map((i) => ({
          ...i,
          left: Number(i.left) - Number(i.sellQuantity)
        }))

        const availableUpdatedLeftOver = product.subproducts.filter((i) => i.left !== 0)

        if (availableUpdatedLeftOver.length === 0) {
          productDetails.leftOver = productDetails?.leftOver?.filter(
            (i) => i.leftOverId !== leftOverId
          )
        } else {
          // Formate list to remove sell quantity property
          const formatedList = availableUpdatedLeftOver.map((i) => ({
            name: i.name,
            defaultQuantity: i.defaultQuantity,
            id: i.id,
            left: i.left
          }))

          productDetails.leftOver = productDetails?.leftOver?.map((i) =>
            i.leftOverId === leftOverId
              ? {
                  ...i,
                  subproducts: formatedList
                }
              : i
          )
        }

        const UpdatedProduct = productsData.map((i) =>
          i.productId === product.productId ? productDetails : i
        )

        return updateProductFn(UpdatedProduct)
      } else return product
    })

    const UpdatedHistoryData = [
      {
        listOfProducts: listOfProducts,
        checkoutInfo: {
          ...checkoutInfo,
          createdAt: Date.now(),
          modified: false,
          modeifedAt: '',
          checkoutId: uuidv4()
        }
      },
      ...historyData
    ]

    await db.update({}, { $set: { history: UpdatedHistoryData } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error uploading product to history', updateErr)
        res.status(500).json({ error: 'Failed to checkout' })
        return
      }

      res.status(200).json({ message: 'Checkout was successful', data: UpdatedHistoryData })

      return
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
