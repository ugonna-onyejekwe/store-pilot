import * as yup from 'yup'

// ADD CATEGORY SCHEMA
export const AddCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  hasSubcategories: yup.boolean(),
  hasColor: yup.boolean(),
  hasDesign: yup.boolean(),
  hasSubProducts: yup.boolean(),
  subcategories: yup
    .string()
    .test(
      'is-required-if-has-sub-categories',
      'List of subcategories is required',
      function (value) {
        const { hasSubcategories } = this.parent // Access other field's value
        return !hasSubcategories || (hasSubcategories && value) // Validation logic
      }
    ),
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

export const EnterSubCategories = yup.object().shape({
  hasSubcategories: yup.boolean(),
  subcategories: yup
    .string()
    .test(
      'is-required-if-has-sub-categories',
      'List of subcategories is required',
      function (value) {
        const { hasSubcategories } = this.parent // Access other field's value
        return !hasSubcategories || (hasSubcategories && value) // Validation logic
      }
    )
})

export const EnterColorsSchema = yup.object().shape({
  hasColor: yup.boolean(),

  colors: yup
    .string()
    .test('is-required-if-has-colors', 'List of colours is required', function (value) {
      const { hasColor } = this.parent
      return !hasColor || (hasColor && value)
    }),

  designs: yup
    .string()
    .test('is-required-if-has-colors', 'List of designs is required', function (value) {
      const { hasColor } = this.parent
      return !hasColor || (hasColor && value)
    })
})
