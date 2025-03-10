import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// FORMATE CATEGORY
export const formateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      hasModel,
      hasColor,
      hasSubProducts,
      subProducts,
      subcategories,
      hasSubcategories,
      colors,
      designs
    }: CreateCategoryRequestBody = req.body

    let formatedListOfSubCategories: { name: string; id: string }[] = []
    let formatedListOfColours: string[] = []
    let formatedListOfDesigns: string[] = []

    let formatedListOfSubproducts: {
      subCategoryName?: string
      // subCategoryId?: string
      name?: string
      defaultQuantity?: number
      // id?: string
      subProducts?: {
        name: string
        defaultQuantity: number
        // id: string
      }[]
    }[] = []

    // Formating values values to return arrays
    formatedListOfSubCategories = hasSubcategories
      ? subcategories
          .split(',')
          .filter(Boolean)
          .map((i) => ({ name: i.trim(), id: uuidv4() }))
      : []

    formatedListOfColours = hasColor
      ? colors
          .split(',')
          .filter(Boolean)
          .map((i) => i.trim())
      : []

    formatedListOfDesigns = hasColor
      ? designs
          .split(',')
          .filter(Boolean)
          .map((i) => i.trim())
      : []

    // Formating values to return id with each value
    formatedListOfSubproducts = hasSubcategories
      ? subProducts.map((subproduct) => {
          const subCate = formatedListOfSubCategories.find(
            (i) => subproduct.subCategoryName?.toLowerCase() === i.name.toLowerCase()
          )

          subproduct.subProducts = subproduct.subProducts?.map((i) =>
            i.id ? i : { ...i, id: uuidv4() }
          )

          return {
            ...subproduct,
            subCategoryId: subCate?.id
          }
        })
      : subProducts.map((i) => ({ ...i, id: uuidv4() }))

    req.formatedData = {
      name,
      hasModel,
      hasColor,
      hasSubProducts,
      subProducts: formatedListOfSubproducts,
      subcategories: formatedListOfSubCategories,
      hasSubcategories,
      colors: formatedListOfColours,
      designs: formatedListOfDesigns
    }

    return next()
  } catch (error) {
    res.status(500).json({ message: 'Error occured while formatting data' })
  }
}

// CREATING CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = req.doc.categories
    const { formatedData } = req

    // create new category
    const newCategoryData = {
      ...formatedData,
      id: uuidv4()
    }

    // geting and updating store data
    const updatedCategories = [...allCategory, newCategoryData]

    return await db.update({}, { $set: { categories: updatedCategories } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating categories:', updateErr)
        return res.status(500).json({ error: 'Failed to create category' })
      }

      return res.status(201).json({ message: 'Category created', data: newCategoryData })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GETTING ALL CATEGORY
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategory = req.doc.categories
    res.status(200).json(allCategory)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GETTING SINGLE CATEGORY
export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const allCategory = req.doc.categories
    const filteredCategory = allCategory.find((i) => i.id === id)

    res.status(200).json(filteredCategory)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Edit category
export const editCategory = async (req: Request, res: Response) => {
  //   try {
  //     const { id } = req.params
  //     delete req.body.id
  //     const allCategory = req.doc.category
  //     const updatedCategories = allCategory.map((i) =>
  //       i.id === id
  //         ? {
  //             ...i,
  //             ...req.formatedData
  //           }
  //         : i
  //     )
  //     return await db.update({}, { $set: { category: updatedCategories } }, {}, (err, _) => {
  //       if (err) {
  //         return res.status(500).json({ error: 'Failed to update category' })
  //       }
  //       return res.status(200).json({ message: 'Category updated' })
  //     })
  //   } catch (error) {
  //     res.status(500).send(error)
  //   }
}

// VERIFY IF CATEGORY NAME ALREADY EXIST
export const verifyCategoryName = async (req: Request, res: Response) => {
  try {
    const allCategories = req.doc.categories
    const { categoryName } = req.body

    const categoryAlreadyExist = allCategories?.find(
      (i) => i.name.toLowerCase() === categoryName.toLowerCase()
    )

    if (categoryAlreadyExist) {
      res.status(400).json({ message: `Category with name: '${categoryName}' already exist` })
      return
    }

    res.status(200).json({ message: 'Category name is available' })
  } catch (error) {
    res.status(500).json(error)
  }
}

// DELETE CATEGORY
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params
    const allCategory = req.doc.categories
    const productList = req.doc.products

    const productStillExist = productList.find((i) => i.categoryId === categoryId)

    if (productStillExist)
      return res
        .status(400)
        .json({ message: "Can't delete this category. Product still exist under this category" })

    const updatedCategories = allCategory.filter((i) => i.id !== categoryId)

    return await db.update({}, { $set: { categories: updatedCategories } }, {}, (err, _) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete category' })
      }

      return res.status(200).json({ message: 'Category deleted' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
