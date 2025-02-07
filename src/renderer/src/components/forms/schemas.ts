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
  hasDesign: yup.boolean()
})
