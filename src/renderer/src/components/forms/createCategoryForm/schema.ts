import * as yup from 'yup'

// ADD CATEGORY SCHEMA
export const AddCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  hasModel: yup.boolean(),
  hasColor: yup.boolean(),
  hasSubProducts: yup.boolean(),
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
    ),
  subProducts: yup.array()
})

// CREATE CATEGORY SUB-FORMS SCHEMA STARTS =====
export const EnterNameSchema = yup.object().shape({
  name: yup.string().required('Category is required'),
  hasModel: yup.boolean(),
  hasColor: yup.boolean()
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
