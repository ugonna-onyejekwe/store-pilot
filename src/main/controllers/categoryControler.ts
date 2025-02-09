import { NextFunction, Request, RequestHandler, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

// FORMATE CATEGORY
export const formateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name,
      hasSize,
      hasColor,
      hasDesign,
      hasSubProducts,
      hasVariations,
      sizes,
      subProducts,
      variations,
      variablesSubproducts,
      colors,
      designs
    } = req.body

    if (!name) {
      return res.status(401).json({
        message: 'Enter category name'
      })
    }

    let formatedListOfSizes: { name: string; id: string }[] = []
    let formatedListOfSubproducts: { name: string; id: string }[] = []
    let formatedListOfVariation: { name: string; id: string }[] = []
    let formatedListOfVariationSubProducts: { name: string; id: string }[] = []
    let formatedListOfColors: { name: string; id: string }[] = []
    let formatedListOfDesigns: { name: string; id: string }[] = []

    // Formating values values to return arrays
    const listOfSizes = sizes ? sizes.split(',') : []
    const listOfSubproducts = subProducts ? subProducts.split(',') : []
    const listOfVariation = variations ? variations.split(',') : []
    const listOfVariationSubProducts = variablesSubproducts ? variablesSubproducts.split(',') : []
    const listOfColors = colors ? colors.split(',') : []
    const listOfDesigns = designs ? designs.split(',') : []

    // Formating values to return id with each value
    formatedListOfSizes = listOfSizes.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfSubproducts = listOfSubproducts.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfVariation = listOfVariation.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfVariationSubProducts = listOfVariationSubProducts.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfColors = listOfColors.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    formatedListOfDesigns = listOfDesigns.map((i) => ({
      name: i,
      id: uuidv4()
    }))

    console.log(designs, formatedListOfDesigns)

    req.formatedData = {
      name,
      hasSize,
      hasColor,
      hasDesign,
      hasSubProducts,
      hasVariations,
      formatedListOfSizes,
      formatedListOfSubproducts,
      formatedListOfVariation,
      formatedListOfVariationSubProducts,
      formatedListOfColors,
      formatedListOfDesigns
    }

    next()
  } catch (error) {
    res.status(500).json(error)
  }
}

// CREATING CATEGORY
export const createCategory = async (req: Request, res: Response) => {
  try {
    const id = uuidv4()

    const allCategory = req.doc.category
    const { categoryName } = req.formatedData.name

    const categoryAlreadyExist = allCategory?.filter((i) => i.name === categoryName)

    if (categoryAlreadyExist.length > 0)
      return res
        .status(401)
        .json({ message: `Category with name: '${categoryName}' already exist` })

    const newCategoryData = {
      ...req.formatedData,
      id
    }

    // geting and updating store data
    const updatedCategories = [...allCategory, newCategoryData]

    await db.update({}, { $set: { category: updatedCategories } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating categories:', updateErr)
        return res.status(500).json({ error: 'Failed to create category' })
      }

      res.status(201).json({ message: 'Category created' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// GETTING ALL CATEGORY
export const getAllCategories = async (req: Request, res: Response) => {
  const allCategory = req.doc.category

  if (!allCategory) return res.status(500).json({ message: 'Error fetching categories' })

  res.status(200).json(allCategory)
}

// GETTING SINGLE CATEGORY
export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const allCategory = req.doc.category

    const filteredCategory = allCategory.filter((i) => i.id === id)[0]

    const {
      formatedListOfSizes,
      formatedListOfSubproducts,
      formatedListOfVariation,
      formatedListOfVariationSubProducts,
      formatedListOfColors,
      formatedListOfDesigns
    } = filteredCategory

    // Formating values to return value
    filteredCategory.formatedListOfSizes = formatedListOfSizes
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    filteredCategory.formatedListOfSubproducts = formatedListOfSubproducts
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    filteredCategory.formatedListOfVariation = formatedListOfVariation
      .map((i) => i.name)
      .filter(Boolean)
      .join(',')

    filteredCategory.formatedListOfVariationSubProducts = formatedListOfVariationSubProducts
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

    db.update({}, { $set: { category: updatedCategories } }, {}, (err, _) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update category' })
      }

      res.status(200).json({ message: 'Category updated' })
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

    const categoryAlreadyExist = allCategories?.filter((i) => i.name === categoryName)

    if (categoryAlreadyExist.length > 0)
      return res
        .status(400)
        .json({ message: `Category with name: '${categoryName}' already exist` })

    res.status(200).json({ message: 'Category name is available' })
  } catch (error) {
    res.status(500).json(error)
  }
}
