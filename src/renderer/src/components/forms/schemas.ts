import * as yup from 'yup'

// CONFIG WAREHOUSE
export const ConfigStoreSchema = yup.object().shape({
  warehouse: yup.string(),
  actionType: yup.string()
})

// LOGIN SCHEMA
export const LoginSchema = yup.object().shape({
  password: yup.string().required('Enter password')
})

// RESET PASSWORD SCHEMAs STARTS ========
export const ResetPasswordSchema = yup.object().shape({
  developerFirstName: yup.string().required('Required'),
  developerPhoneNumber: yup.string().required('Required')
})

export const NewPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})
// RESET PASSWORD SCHEMAs ENDS ========

// SELL PRODUCT SCHEMA
export const sellProductSchema = yup.object().shape({
  hasModel: yup.boolean(),
  hasSize: yup.boolean(),
  hasDesign: yup.boolean(),
  hasSubProducts: yup.boolean(),
  category: yup.string(),
  model: yup.string(),
  quantity: yup.number(),
  size: yup.string().test('', 'Size is required', function (value) {
    const { hasSize } = this.parent
    return !hasSize || (hasSize && value)
  }),
  design: yup.string().test('', 'Design is required', function (value) {
    const { hasDesign } = this.parent
    return !hasDesign || (hasDesign && value)
  }),
  color: yup.string().test('', 'Colour is required', function (value) {
    const { hasSize } = this.parent
    return !hasSize || (hasSize && value)
  }),
  typeOfSale: yup.string().test('', 'This field is required', function (value) {
    const { hasSubProducts } = this.parent
    return !hasSubProducts || (hasSubProducts && value)
  }),

  // @ts-expect-error: undefined value
  cartoonQuantity: yup.string().test('', 'This field is required', function (value) {
    const { typeOfSale } = this.parent
    return typeOfSale !== 'sell part' || (typeOfSale === 'sell part' && value)
  }),

  subproducts: yup.array()
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
  whatToEdit: yup.string().required('Select an option'),
  categoryId: yup.string(),
  product: yup.string(),
  productCategory: yup.string()
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
    }),
  totalQuantity: yup.number().min(1, "Total quantity can't be less than 1"),
  lastPrice: yup.number().test('is-required-if-has-modal', 'Enter last price', function (value) {
    const { hasModel } = this.parent // Access other field's value
    return !hasModel || (hasModel && value)
  })
})

export const addPro_totalQuantitySchema = yup.object().shape({
  totalQuantity: yup.number().required('Quantity is required')
})
// ADD PRODUCT SUB-FORMS SCHEMA ENDS =======

// CHECKOUT FORM SCHEMA
export const checkoutFormSchma = yup.object().shape({
  // @ts-expect-error: undefined value
  amountPaid: yup.number().test('', 'Amount paid is required', function (value) {
    const { paymentType } = this.parent // Access other field's value
    return paymentType !== 'half payment' || (paymentType === 'half payment' && value)
  }),
  paymentType: yup.string().required('This field is required'),
  sellingPrice: yup.number().required('How much is customer expected to pay?'),

  totalQuantity: yup.number().min(1, "Total quantity can't be less than 1"),
  supplyStatus: yup.string().required('Supply status is required'),
  customerName: yup.string().required('Customer name is required'),
  phoneNumber: yup.string(),
  supplyLocation: yup.string(),
  sellLocation: yup.string().required('This field is required')
})

// ADMIN AUTH VALIDATIONSCHMA
export const AdminAuthValidationSchema = yup.object().shape({
  oldPassword: yup.string().required('Old password required'),
  newPassword: yup
    .string()
    .required('New password required')
    .min(8, 'Password must be upto 8 characters')
})
