import * as yup from 'yup'

export const SelectCategorySchema = yup.object().shape({
  category: yup.string().required('Category is required')
})

export const selectSubCategorySchema = yup.object().shape({
  subcategory: yup.string().required('Category is required')
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
