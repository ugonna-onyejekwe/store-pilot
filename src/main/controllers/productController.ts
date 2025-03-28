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
      hasDesigns,
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

        const updatedProductsList = [newProduct, ...allProducts]

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
        categoryName,
        productId: uuidv4(),
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
        hasDesigns
      }

      const updatedProductsList = [newProduct, ...allProducts]

      return updateProductListFn(updatedProductsList, newProduct)
    } else if (actionType === 'update') {
      const product = allProducts.find((i) => i.productId === productId)

      if (!product) {
        res.send(404).json({ message: 'Product does not exist' })
        return
      }

      // updating total quantity available
      product.totalQuantity = Number(product.totalQuantity) + Number(totalQuantity)

      // updating colors available
      if (product.hasColors) {
        colors.map((i) => {
          const exist = product.colors.find((j) => j.id === i.id)

          if (!exist) {
            product.colors = [i, ...product.colors]
            return
          }

          product.colors = product.colors.map((color) => {
            if (i.id === color.id) {
              return {
                ...color,
                availableQuantity: Number(i.availableQuantity) + Number(color?.availableQuantity),
                available: true
              }
            }
            return color
          })
        })

        product.colors = product.colors.filter(Boolean)
      }

      // updating designs availables
      if (product.hasDesigns) {
        designs.map((i) => {
          const exist = product.designs.find((j) => j.colorId === i.colorId)

          if (!exist) {
            product.designs = [i, ...product.designs]
            return
          }

          product.designs = product.designs.map((design) => {
            if (design.colorId === i.colorId) {
              // mapping inner designs
              i.designs.map((j) => {
                const designexist = design.designs.find((k) => k.id === j.id)

                if (!designexist) {
                  design.designs = [j, ...design.designs]
                  return
                }

                design.designs = design.designs.map((k) => {
                  if (k.id === j.id) {
                    return {
                      ...k,
                      availableQuantity: Number(j.availableQuantity) + Number(k.availableQuantity),
                      available: true
                    }
                  }

                  return k
                })
              })

              return design
            }

            return design
          })
        })
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
// export const editProduct = async (req: Request, res: Response) => {
//   try {
//     // const { productId } = req.body
//     // const { productInfo } = req
//     // const productList = req.doc.products
//     // let product = productList.find((i) => i.productId === productId)
//     // // @ts-ignore: Gives error of incompactible
//     // product = {
//     //   ...product,
//     //   ...productInfo
//     // }
//     // const updatedProductsList = productList.map((i) => {
//     //   if (i.productId === productId) return product
//     //   return i
//     // })
//     // await db.update({}, { $set: { products: updatedProductsList } }, {}, (updateErr, _) => {
//     //   if (updateErr) {
//     //     console.error('Error updating product list', updateErr)
//     //     res.status(500).json({ error: 'Failed to update product' })
//     //     return
//     //   }
//     //   res.status(200).json({ message: 'Product updated successfly', data: product })
//     // })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

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

        // reduce color quantity
        if (productData?.hasColors) {
          productData.colors = productData.colors.map((i) =>
            i.id === product.color
              ? {
                  ...i,
                  availableQuantity: Number(i.availableQuantity) - Number(product.quantity),
                  available: Number(i.availableQuantity) - Number(product.quantity) > 0
                }
              : i
          )
        }

        // reduce design quantity
        if (productData.hasDesigns) {
          productData.designs = productData.designs.map((i) => {
            if (i.colorId === product.color) {
              i.designs = i.designs.map((des) =>
                des.id === product.design
                  ? {
                      ...des,
                      availableQuantity: Number(des.availableQuantity) - Number(product.quantity),
                      available: Number(des.availableQuantity) - Number(product.quantity) > 0
                    }
                  : des
              )

              return i
            }

            return i
          })
        }

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

        const updatedProductList = products.map((i) =>
          i.productId === product.productId ? productData : i
        )

        updateProductFn(updatedProductList)
        return
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

          updateProductFn(updatedProductList)
          return
        } else {
          // remove leftover
          const updatedProduct = productData?.leftOver?.filter(
            (i) => i.leftOverId !== product.leftOverId
          )

          const updatedProductList = products.map((i) =>
            i.productId === product.productId ? updatedProduct : i
          )

          updateProductFn(updatedProductList)
          return
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
// export const returnProduct = async (req: Request, res: Response) => {
//   try {
//     const {
//       categoryId,
//       productId,
//       subcategory,
//       design,
//       color,
//       subproducts,
//       returnDisposition
//     }: returnProductRequestBody = req.body

//     const allProducts = req.doc.products
//     const allCategories = req.doc.categories

//     const category = allCategories.find((i) => i.id === categoryId)

//     const product = allProducts.find((i) => i.productId === productId)

//     if (!product) {
//       res.status(404).json({ message: 'Product does not exist' })

//       return
//     }

//     product.totalQuantity = Number(product.totalQuantity) + 1

//     if (category?.hasColor) {
//       product.colors = product.colors.map((i) =>
//         i.name === color ? { ...i, availableQuantity: Number(i.availableQuantity) + 1 } : i
//       )
//     }

//     if (category?.hasColor) {
//       product.designs = product.designs.map((i) => {
//         if (i.colorName === color) {
//           i.designs = i.designs.map((item) =>
//             item.name === design
//               ? { ...item, availableQuantity: Number(item.availableQuantity) + 1 }
//               : item
//           )

//           return i
//         } else {
//           return i
//         }
//       })
//     }

//     if (category?.hasSubProducts && category.hasSubcategories === false) {
//       // product.subProducts = subproducts.map(i=>{
//       //   return product.subProducts.find(sub=>{
//       //     if(sub.id ==== i.id){
//       //       sub.
//       //     }
//       //   })
//       // })
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }
