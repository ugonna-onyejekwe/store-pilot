import * as yup from 'yup'

// SELL PRODUCT SCHEMA
export const sellProductSchema = yup.object().shape({
  category: yup.string().required('Category is required'),
  modal: yup.string().required('Modal is required'),
  color: yup.string(),
  design: yup.string(),
  quantity: yup.number().required('Quantity is required')
})

// LOGIN SCHEMA
export const LoginSchema = yup.object().shape({
  password: yup.string().required('Enter password')
})

// ADD CATEGORY SCHEMA
export const AddCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  hasSize: yup.boolean(),
  hasColor: yup.boolean(),
  hasDesign: yup.boolean(),
  hasSubProducts: yup.boolean(),
  sizes: yup
    .string()
    .test('is-required-if-has-size', 'List of sizes is required', function (value) {
      const { hasSize } = this.parent // Access other field's value
      return !hasSize || (hasSize && value) // Validation logic
    }),

  subProducts: yup.array(),

  colors: yup
    .string()
    .test('is-required-if-has-colors', 'List of colours is required', function (value) {
      const { hasColor } = this.parent
      return !hasColor || (hasColor && value)
    }),
  designs: yup
    .string()
    .test('is-required-if-has-colors', 'List of designs is required', function (value) {
      const { hasDesign } = this.parent
      return !hasDesign || (hasDesign && value)
    })
})

// CREATE CATEGORY SUB-FORMS SCHEMA STARTS =====
export const EnterNameSchema = yup.object().shape({
  name: yup.string().required('Category is required'),
  hasModel: yup.boolean()
})

export const EnterSizesSchema = yup.object().shape({
  hasSize: yup.boolean(),
  sizes: yup
    .string()
    .test('is-required-if-has-size', 'List of sizes is required', function (value) {
      const { hasSize } = this.parent // Access other field's value
      return !hasSize || (hasSize && value) // Validation logic
    })
})

export const EnterSubProductSchema = yup.object().shape({
  hasSubProducts: yup.boolean(),
  subProducts: yup.array()
})

export const EnterColorsSchema = yup.object().shape({
  hasColor: yup.boolean(),

  colors: yup
    .string()
    .test('is-required-if-has-colors', 'List of colours is required', function (value) {
      const { hasColor } = this.parent
      return !hasColor || (hasColor && value)
    })
})

export const EnterDesignSchema = yup.object().shape({
  hasDesign: yup.boolean(),

  designs: yup
    .string()
    .test('is-required-if-has-colors', 'List of designs is required', function (value) {
      const { hasDesign } = this.parent
      return !hasDesign || (hasDesign && value)
    })
})
// CREATE CATEGORY SUB-FORMS SCHEMA ENDS =====

// WHAT DO YOU WANT TO EDIT SCHEMA
export const WhatToEditSchema = yup.object().shape({
  whatToEdit: yup.string(),
  categoryId: yup.string()
})

// ADD PRODUCT SUB-FORMS SCHEMA STARTS =======

export const addPro_selectCategorySchema = yup.object().shape({
  category: yup.string().required('Category is required')
})

export const addPro_enterModelSchema = yup.object().shape({
  hasModel: yup.boolean(),
  model: yup.string().test('is-required-if-has-modal', 'Modal is required', function (value) {
    const { hasModel } = this.parent // Access other field's value
    return !hasModel || (hasModel && value) // Validation logic
  }),
  cartoonQuantity: yup
    .number()
    .test('is-required-if-has-modal', 'cartoon quantity is required', function (value) {
      const { hasModel } = this.parent // Access other field's value
      return !hasModel || (hasModel && value)
    })
})

export const addPro_totalQuantitySchema = yup.object().shape({
  totalQuantity: yup.number().required('Quantity is required')
})

// ADD PRODUCT SUB-FORMS SCHEMA ENDS =======
