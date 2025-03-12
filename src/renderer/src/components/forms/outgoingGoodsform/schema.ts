import * as yup from 'yup'

const subproductType = yup.object().shape({
  defaultQuantity: yup.number(),
  id: yup.string(),
  name: yup.string(),
  available: yup.boolean(),
  sellQuantity: yup.number()
})

export const sellGoodsSchema = yup.object().shape({
  hasSubCategory: yup.boolean(),
  hasModel: yup.boolean(),
  hasColor: yup.boolean(),
  hasSubProducts: yup.boolean(),
  categoryId: yup.string().required('Category is required'),
  subcategory: yup.string().test('', 'sub-category is required', function (value) {
    const { hasSubCategory } = this.parent
    return !hasSubCategory || (hasSubCategory && value)
  }),
  model: yup.string(),

  productId: yup.string().test('', 'This field is required', function (value) {
    const { hasModel } = this.parent
    return !hasModel || (hasModel && value)
  }),
  sellType: yup.string().test('', 'This field is required', function (value) {
    const { hasSubProducts } = this.parent
    return !hasSubProducts || (hasSubProducts && value)
  }),
  subproducts: yup.array().of(subproductType),
  color: yup.string().test('', 'This field is required', function (value) {
    const { hasColor } = this.parent
    return !hasColor || (hasColor && value)
  }),
  design: yup.string().test('', 'This field is required', function (value) {
    const { hasColor } = this.parent
    return !hasColor || (hasColor && value)
  }),
  quantity: yup.number()
})

export const checkoutFormSchma = yup.object().shape({
  paymentType: yup.string(),
  amountPaid: yup.number().test('', 'This field is required', function (value) {
    const { paymentType } = this.parent
    return paymentType !== 'half' || !!value
  }),
  amountToPay: yup.number().test('', 'This field is required', function (value) {
    const { paymentType } = this.parent
    return !(paymentType === 'half' || paymentType === 'credit') || !!value
  }),
  customerName: yup.string().required('This field is required'),
  locationSold: yup.string().required('This field is required')
})
