import { NextFunction, Request, RequestHandler, Response } from 'express'
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
      colors,
      designs,
      subcategories,
      hasSubcategories
    } = req.body

    if (!name) {
      return res.status(401).json({
        message: 'Enter category name'
      })
    }

    let formatedListOfsubCategories: { name: string; id: string }[] = []
    let formatedListOfSubproducts: { name: string; defaultQuantity: number; id?: string }[] = []
    let formatedListOfColors: { name: string; id: string }[] = []
    let formatedListOfDesigns: { name: string; id: string }[] = []

    // Formating values values to return arrays
    const listOfSizes = sizes ? sizes.split(',') : []
    const listOfColors = colors ? colors.split(',') : []
    const listOfDesigns = designs ? designs.split(',') : []

    // Formating values to return id with each value
    formatedListOfsubCategories = listOfSizes.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfSubproducts = subProducts

    formatedListOfColors = listOfColors.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfDesigns = listOfDesigns.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    req.formatedData = {
      name,
      hasModel,
      hasColor,
      hasSubProducts,
      formatedListOfSubproducts,
      formatedListOfColors,
      formatedListOfDesigns
    }

    return next()
  } catch (error) {
    res.status(500).json({ message: 'Error occured while formatting data' })
  }
}

// CREATING CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  try {
    const id = uuidv4()

    const allCategory = req.doc.category
    const { name, formatedListOfSubproducts } = req.formatedData

    // check if new category already exist
    const categoryAlreadyExist = allCategory?.filter((i) => i.name === name)

    if (categoryAlreadyExist.length > 0)
      return res.status(401).json({ message: `Category with name: '${name}' already exist` })

    // Add id to subproducts
    const upDatedSubProducts = formatedListOfSubproducts.map((i) => ({ ...i, id: uuidv4() }))

    // create new category
    const newCategoryData = {
      ...req.formatedData,
      formatedListOfSubproducts: upDatedSubProducts,
      id
    }

    // geting and updating store data
    const updatedCategories = [...allCategory, newCategoryData]

    return await db.update({}, { $set: { category: updatedCategories } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating categories:', updateErr)
        return res.status(500).json({ error: 'Failed to create category' })
      }

      return res.status(201).json({ message: 'Category created' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GETTING ALL CATEGORY
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategory = req.doc.category

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
    const allCategory = req.doc.category

    const filteredCategory = allCategory.filter((i) => i.id === id)[0]

    const { formatedListOfSizes, formatedListOfColors, formatedListOfDesigns } = filteredCategory

    // Formating values to return value
    filteredCategory.formatedListOfSizes = formatedListOfSizes
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    filteredCategory.formatedListOfColors = formatedListOfColors
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    filteredCategory.formatedListOfDesigns = formatedListOfDesigns
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    res.status(200).json(filteredCategory)
  } catch (error) {
    res.status(500).send(error)
  }
}

// Edit category
export const editCategory: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    delete req.body.id
    const allCategory = req.doc.category

    const updatedCategories = allCategory.map((i) =>
      i.id === id
        ? {
            ...i,
            ...req.formatedData
          }
        : i
    )

    return await db.update({}, { $set: { category: updatedCategories } }, {}, (err, _) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update category' })
      }

      return res.status(200).json({ message: 'Category updated' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

// VERIFY IF CATEGORY NAME ALREADY EXIST
export const verifyCategoryName = async (req: Request, res: Response) => {
  try {
    const allCategories = req.doc.category
    const { categoryName } = req.body

    const categoryAlreadyExist = allCategories?.filter(
      (i) => i.name.toLowerCase() === categoryName.toLowerCase()
    )

    if (categoryAlreadyExist.length > 0) {
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
    const allCategory = req.doc.category
    const productList = req.doc.products

    const productStillExist = productList.find((i) => i.category.id === categoryId)

    if (productStillExist)
      return res
        .status(400)
        .json({ message: "Can't delete this category. Product still exist under this category" })

    const updatedCategories = allCategory.filter((i) => i.id !== categoryId)

    return await db.update({}, { $set: { category: updatedCategories } }, {}, (err, _) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete category' })
      }

      return res.status(200).json({ message: 'Category deleted' })
    })
  } catch (error) {
    res.status(500).send(error)
  }
}
