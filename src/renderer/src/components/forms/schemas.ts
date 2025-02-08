import * as yup from 'yup'

export const sellProductSchema = yup.object().shape({
  category: yup.string().required('Category is required'),
  modal: yup.string().required('Modal is required'),
  color: yup.string(),
  design: yup.string(),
  quantity: yup.number().required('Quantity is required')
})

export const LoginSchema = yup.object().shape({
  password: yup.string().required('Enter password')
})

export const AddCategoryFormSchema = yup.object().shape({
  name: yup.string().required('Category is required'),
  hasSize: yup.boolean(),
  hasColor: yup.boolean(),
  hasDesign: yup.boolean(),
  hasSubProducts: yup.boolean(),
  hasVariations: yup.boolean(),
  sizes: yup
    .string()
    .test('is-required-if-has-size', 'List of sizes is required', function (value) {
      const { hasSize } = this.parent // Access other field's value
      return !hasSize || (hasSize && value) // Validation logic
    }),

  subProducts: yup
    .string()
    .test('is-required-if-has-sub-products', 'List of sub-products is required', function (value) {
      const { hasSubProducts } = this.parent
      return !hasSubProducts || (hasSubProducts && value)
    }),
  variations: yup
    .string()
    .test('is-required-if-has-variations', 'List of variations is required', function (value) {
      const { hasVariations } = this.parent
      return !hasVariations || (hasVariations && value)
    }),
  variablesSubproducts: yup
    .string()
    .test('is-required-if-has-variations', 'List of variations is required', function (value) {
      const { hasVariations } = this.parent
      return !hasVariations || (hasVariations && value)
    }),
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
