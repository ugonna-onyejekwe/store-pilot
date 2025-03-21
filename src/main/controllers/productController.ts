import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

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
      designs,
      productId
    }: CreateProductRequestBody = req.body

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

          return res
            .status(201)
            .json({ message: 'Product list updated  successfully', data: newProduct })
        }
      )
    }

    // If product does not have model
    if (!model || model === '') {
      // checking if product already exist in the category without modal
      const parentProduct = allProducts.find((i) => i.productId === categoryId && i.isParentProduct)

      // if not: asign new product
      if (!parentProduct) {
        const newProduct = {
          categoryName,
          categoryId,
          subCategory,
          model,
          hasModel,
          hasSubProducts,
          hasSubCategory,
          hasColors,
          totalQuantity,
          cartoonsPerSet,
          subProducts,
          colors,
          designs,
          productId: categoryId,
          isParentProduct: true
        }

        const updatedProductsList = [...allProducts, newProduct]

        return updateProductListFn(updatedProductsList, newProduct)
      } else {
        const updatedList = allProducts.map((i) => {
          if (i.productId === categoryId && i.isParentProduct) {
            i.totalQuantity = Number(i.totalQuantity) + Number(totalQuantity)

            i.cartoonsPerSet = actionType === 'new' ? cartoonsPerSet : i.cartoonsPerSet

            return i
          }

          return i
        })

        return updateProductListFn(updatedList, updatedList)
      }
    }

    //if product has model
    if (actionType === 'new') {
      const newProduct = {
        productId: uuidv4(),
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
      }

      const updatedProductsList = [...allProducts, newProduct]

      return updateProductListFn(updatedProductsList, newProduct)
    } else if (actionType === 'update') {
      const product = allProducts.find((i) => i.productId === productId)

      if (!product) {
        res.send(404).json({ message: 'Product does not exist' })
        return
      }

      // updating total quantity available
      product.totalQuantity = Number(product.totalQuantity) + Number(totalQuantity)

      if (product.hasColors) {
        // updating colors available
        const UpdatedColors = colors.map((i) => {
          return product.colors.map((color) => {
            if (color.id === i.id) {
              return {
                ...color,
                availableQuantity: Number(i.availableQuantity) + Number(color.availableQuantity)
              }
            } else {
              return i
            }
          })[0]
        })

        // updating designs availables
        const updatedDesigns = designs.map((i) => {
          return product.designs.find((design) => {
            if (design.colorId === i.colorId) {
              i.designs.map((secondLvlDesign) => {
                design.designs = design.designs.map((thirdLvlDesign) => {
                  if (secondLvlDesign.id === thirdLvlDesign.id) {
                    return {
                      ...thirdLvlDesign,
                      availableQuantity:
                        Number(secondLvlDesign.availableQuantity) +
                        Number(thirdLvlDesign.availableQuantity)
                    }
                  }

                  return secondLvlDesign
                })
              })
            }

            return design
          })
        })

        // assigning values
        product.colors = UpdatedColors
        // @ts-expect-error:undefined value
        product.designs = updatedDesigns
      }

      const updatedProductList = allProducts.map((i) =>
        i.productId === product.productId ? product : i
      )

      return updateProductListFn(updatedProductList, product)
    } else {
      res.status(403).send('Action type was not specified')
    }
  } catch (error) {
    console.log(error)
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
      let filteredList = productList.filter((i) => i.categoryId === categoryId)

      if (subCategoryName) {
        filteredList = filteredList.filter(
          (i) => i.subCategory.toLowerCase() === subCategoryName.toLowerCase()
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
    (i) => i.model.toLowerCase() === model.toLowerCase() && i.categoryId === categoryId
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

    const { histories, products, customers } = req.doc

    // update product list
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

    if (checkoutInfo.customerId) {
      const customerProfile = customers.find((i) => i.id === checkoutInfo.customerId)

      if (!customerProfile) {
        res.send(404).json({ message: 'Customer does not exist' })

        return
      }

      customerProfile.debt =
        checkoutInfo.paymentType === 'credit'
          ? Number(customerProfile.debt) + Number(checkoutInfo.amountToPay)
          : checkoutInfo.paymentType === 'half'
            ? Number(customerProfile.debt) +
              (Number(checkoutInfo.amountToPay) - Number(checkoutInfo.amountPaid))
            : Number(customerProfile.debt)

      const updatedCustomerList = customers.map((i) =>
        i.id === checkoutInfo.customerId ? customerProfile : i
      )

      await db.update({}, { $set: { customers: updatedCustomerList } }, {}, (updateErr, _) => {
        if (updateErr) {
          console.error('Error updating customer profile', updateErr)
          res.status(500).json({ error: 'Failed to edit customer profile' })
          return
        }

        return
      })
    }

    listOfProducts.map((product) => {
      const productData = products.find((i) => i.productId === product.productId)

      if (!productData) {
        res.status(404).json({ message: 'Product does not exist' })
        return
      }

      // when selling a product in full
      // OR
      // when selling part of product
      if (product.sellType !== 'leftOver') {
        productData.totalQuantity = Number(productData?.totalQuantity) - Number(product.quantity)

        if (product.hasColor) {
          // reduce color quantity
          productData.colors.map((i) =>
            i.name === product.color
              ? { ...i, availableQuantity: Number(i.availableQuantity) - Number(product.quantity) }
              : i
          )

          // reduce design quantity
          productData.designs.map((i) => {
            if (i.colorName === product.color) {
              i.designs = i.designs.map((des) =>
                des.name === product.design
                  ? {
                      ...des,
                      availableQuantity: Number(des.availableQuantity) - Number(product.quantity)
                    }
                  : des
              )

              return i
            }

            return i
          })
        }

        const updatedProductList = products.map((i) =>
          i.productId === product.productId ? productData : i
        )

        if (product.sellType === 'part') {
          const subproductLeft = product.subproducts.filter(
            (i) => i.defaultQuantity !== i.sellQuantity
          )

          if (subproductLeft.length !== 0) {
            const formatedSubproductLeft = subproductLeft.map((i) => ({
              defaultQuantity: i.defaultQuantity,
              id: i.id,
              name: i.name,
              left: Number(i.defaultQuantity) - Number(i.sellQuantity)
            }))

            const newLeftOver = {
              productId: productData.productId,
              color: product.color,
              design: product.design,
              leftOverId: uuidv4(),
              model: product.model,
              subproducts: formatedSubproductLeft
            }

            productData.leftOver = productData.leftOver
              ? [newLeftOver, ...productData.leftOver]
              : [newLeftOver]
          }
        }

        return updateProductFn(updatedProductList)
      }

      // when selling leftOvers
      if (product.sellType === 'leftOver') {
        const subproductLeft = product.subproducts.filter(
          (i) => Number(i.left) !== Number(i.sellQuantity)
        )

        if (subproductLeft.length !== 0) {
          const formatedSubproductLeft = subproductLeft.map((i) => ({
            defaultQuantity: i.defaultQuantity,
            id: i.id,
            name: i.name,
            left: Number(i.left) - Number(i.sellQuantity)
          }))

          const updatedProduct = productData.leftOver?.map((i) =>
            i.leftOverId === product.leftOverId ? { ...i, subproducts: formatedSubproductLeft } : i
          )

          const updatedProductList = products.map((i) =>
            i.productId === product.productId ? updatedProduct : i
          )

          return updateProductFn(updatedProductList)
        } else {
          // remove leftover
          const updatedProduct = productData?.leftOver?.filter(
            (i) => i.leftOverId !== product.leftOverId
          )

          const updatedProductList = products.map((i) =>
            i.productId === product.productId ? updatedProduct : i
          )

          return updateProductFn(updatedProductList)
        }
      }
    })

    const updatedHistoryList = [
      {
        listOfProducts,
        checkoutInfo: {
          ...checkoutInfo,
          checkoutId: uuidv4(),
          createdAt: new Date()
        }
      },
      ...histories
    ]

    await db.update({}, { $set: { histories: updatedHistoryList } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error checking out', updateErr)
        res.status(500).json({ error: 'Failed to checkout while adding to history' })
        return
      }

      res.status(200).json({ message: 'Checkout successful' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// RETURNED PRODUCT
export const returnProduct = async (req: Request, res: Response) => {
  try {
    const {
      categoryId,
      productId,
      subcategory,
      design,
      color,
      subproducts,
      returnDisposition
    }: returnProductRequestBody = req.body

    const allProducts = req.doc.products
    const allCategories = req.doc.categories

    const category = allCategories.find((i) => i.id === categoryId)

    const product = allProducts.find((i) => i.productId === productId)

    if (!product) {
      res.status(404).json({ message: 'Product does not exist' })

      return
    }

    product.totalQuantity = Number(product.totalQuantity) + 1

    if (category?.hasColor) {
      product.colors = product.colors.map((i) =>
        i.name === color ? { ...i, availableQuantity: Number(i.availableQuantity) + 1 } : i
      )
    }

    if (category?.hasColor) {
      product.designs = product.designs.map((i) => {
        if (i.colorName === color) {
          i.designs = i.designs.map((item) =>
            item.name === design
              ? { ...item, availableQuantity: Number(item.availableQuantity) + 1 }
              : item
          )

          return i
        } else {
          return i
        }
      })
    }

    if (category?.hasSubProducts && category.hasSubcategories === false) {
      // product.subProducts = subproducts.map(i=>{
      //   return product.subProducts.find(sub=>{
      //     if(sub.id ==== i.id){
      //       sub.
      //     }
      //   })
      // })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
