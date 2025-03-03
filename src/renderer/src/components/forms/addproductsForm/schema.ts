import * as yup from 'yup'

export const Addproduct__ActionModal_Schame = yup.object().shape({
  actionType: yup.string().required('Select an option')
})

export const SelectSubcategorySchema = yup.object().shape({
  subcategory: yup.string().required('Select an option')
})

export const EnterModelSchema = yup.object().shape({
  model: yup.string().required('Model is required')
})

export const EnterSubproductsSchema = yup.object().shape({
  subProducts: yup.array().required('Model is required')
})
