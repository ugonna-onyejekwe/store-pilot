import { useCreateCategory } from '@renderer/apis/categories/createCategory'
import { toastUI } from '@renderer/components/ui/toast'
import { getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnterColourForm } from './enterColours'
import { EnterDesignForm } from './EnterDesignForm'
import { EnterCategorynameForm } from './enterName'
import { EnterSubCategoriesForm } from './enterSubcategories'
import { EnterSubProductForm } from './enterSubProducts'
import './style.scss'
import Summary from './summary'

export const CreateCategoryForm = () => {
  const { mutateAsync: createCategory, isPending: creatingCategory } = useCreateCategory()
  const navigate = useNavigate()
  const [formSteps, setFormSteps] = useState(1)

  const initialvalues = {
    name: '',
    hasModel: false,
    hasColor: false,
    hasDesign: false,
    hasSubProducts: false,
    subProducts: [],
    subcategories: '',
    hasSubcategories: false,
    colors: '',
    designs: ''
  }

  const onSubmit = async (values) => {
    try {
      createCategory({
        ...values,
        hasColors: values.hasColor,
        hasSubCategory: values.hasSubcategories
      })
        .then(() => {
          resetForm()
          setFormSteps(1)
          toastUI.success('Category created successfully')
        })
        .then(() => navigate('/admin'))
    } catch (error) {
      toastUI.error(getError(error))
    }
  }

  const { errors, touched, handleSubmit, resetForm, values, setFieldValue } = useFormik({
    initialValues: { ...initialvalues },
    onSubmit
  })

  return (
    <div className="create_category_form">
      {formSteps === 1 && (
        <EnterCategorynameForm
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('name', formData.name)
            setFieldValue('hasModel', formData.hasModel)
          }}
        />
      )}

      {/* has subcategories starts */}
      {formSteps === 2 && (
        <EnterSubCategoriesForm
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasSubcategories', formData.hasSubcategories)
            setFieldValue('subcategories', formData.subcategories)
          }}
        />
      )}

      {/* has subproducts starts */}
      {formSteps === 3 && (
        <EnterSubProductForm
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasSubProducts', formData.hasSubProducts)
            setFieldValue('subProducts', formData.subProducts)
          }}
        />
      )}

      {/* has colour */}
      {formSteps === 4 && (
        <EnterColourForm
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasColor', formData.hasColor)
            setFieldValue('colors', formData.colors)
            setFieldValue('designs', formData.designs)
          }}
        />
      )}

      {/* has design */}
      {formSteps === 5 && (
        <EnterDesignForm
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasDesign', formData.hasDesign)
            setFieldValue('designs', formData.designs)
          }}
        />
      )}

      {/* summary */}
      {formSteps === 6 && (
        <Summary
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={() => {
            handleSubmit()
            if (touched && errors) {
              for (const field in errors) {
                toastUI.error(errors[field])
              }
            }
          }}
          isLoading={creatingCategory}
          buttonText={'Create category'}
        />
      )}
    </div>
  )
}
