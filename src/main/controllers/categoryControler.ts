import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import db from '..'

export const createCategory = async (req: Request, res: Response) => {
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

    const id = uuidv4()

    if (!name) {
      return res.status(401).json({
        message: 'Enter category name'
      })
    }

    const allCategory = [...req.doc.category]

    const categoryAlreadyExist = allCategory?.filter((i) => i.name === name)

    if (categoryAlreadyExist.length > 0)
      return res.status(401).json({ message: `Category with name: '${name}' already exist` })

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

    const newCategoryData = {
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
      formatedListOfDesigns,
      id
    }

    // geting and updating store data
    const updatedCategories = [...req.doc.category, newCategoryData]

    await db.update({}, { $set: { category: updatedCategories } }, {}, (updateErr, _) => {
      if (updateErr) {
        console.error('Error updating categories:', updateErr)
        return res.status(500).json({ error: 'Failed to create category' })
      }

      res.status(201).json({ message: 'Category created', data: allCategory })
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  const allCategory = req.doc.category

  if (!allCategory) return res.status(500).json({ message: 'Error fetching categories' })

  res.status(200).json(allCategory)
}
