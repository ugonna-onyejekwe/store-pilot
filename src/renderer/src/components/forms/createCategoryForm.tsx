import { useCreateCategory } from '@renderer/apis/categories/createCategory'
import { useEditCategory } from '@renderer/apis/categories/editCategory'
import { useReturnAllCategories } from '@renderer/apis/categories/getCategories'
import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toastUI } from '../ui/toast'
import { EnterColourForm } from './createCategorySubForms/enterColours'
import { EnterDesignForm } from './createCategorySubForms/enterDesigns'
import { EnterCategorynameForm } from './createCategorySubForms/enterName'
import { EnterSizesForm } from './createCategorySubForms/enterSizesform'
import { EnterSubProductForm } from './createCategorySubForms/enterSubProducts'
import { EnterVariationForm } from './createCategorySubForms/enterVariation'
import { AddCategoryFormSchema } from './schemas'

type CreateCategoryFormProps = {
  actionType?: 'edit'
  categoryId?: string
  categoryData?: SingleCategoryResponse
}

export const CreateCategoryForm = ({
  categoryId,
  actionType,
  categoryData
}: CreateCategoryFormProps) => {
  const { mutate: refetchCategories, isPending: creatingCategory } = useReturnAllCategories()
  const { mutateAsync: EditCategory, isPending: editingCategory } = useEditCategory()
  const { mutateAsync: createCategory } = useCreateCategory()
  const editing = actionType && actionType === 'edit' ? true : false
  const navigate = useNavigate()
  const [formSteps, setFormSteps] = useState(1)

  const initialvalues = {
    name: editing ? categoryData?.name : '',
    hasSize: editing ? categoryData?.hasSize : false,
    hasColor: editing ? categoryData?.hasColor : false,
    hasDesign: editing ? categoryData?.hasDesign : false,
    hasSubProducts: editing ? categoryData?.hasSubProducts : false,
    hasVariations: editing ? categoryData?.hasVariations : false,
    sizes: editing ? categoryData?.formatedListOfSizes : '',
    subProducts: editing ? categoryData?.hasSubProducts : '',
    variations: editing ? categoryData?.formatedListOfVariation : '',
    variablesSubproducts: editing ? categoryData?.formatedListOfVariationSubProducts : '',
    colors: editing ? categoryData?.formatedListOfColors : '',
    designs: editing ? categoryData?.formatedListOfDesigns : ''
  }

  const onSubmit = async (values) => {
    try {
      if (editing) {
        EditCategory({ ...values, id: categoryId })
          .then(() => refetchCategories)

          .then(() => {
            resetForm()
            toastUI.success('Category edited successfully')
            setFormSteps(1)
            values = initialvalues
          })
          .then(() => navigate('/create-category'))
          .then(() => {
            window.location.reload()
          })
        return
      }

      createCategory(values)
        .then(() => refetchCategories)
        .then(() => {
          resetForm()
          setFormSteps(1)
          toastUI.success('Category created successfully')

          return
        })
    } catch (error) {
      toastUI.error(error.response.data.message)
    }
  }

  const { errors, touched, handleSubmit, resetForm, values, setFieldValue } = useFormik({
    initialValues: { ...initialvalues },
    validationSchema: AddCategoryFormSchema,
    onSubmit
  })

  return (
    <div className="form">
      <div className="form_container">
        {formSteps === 1 && (
          <EnterCategorynameForm
            defaultValues={values}
            setFormSteps={setFormSteps}
            handleChange={(formData) => {
              setFieldValue('name', formData.name)
            }}
          />
        )}

        {/* has sizes starts */}
        {formSteps === 2 && (
          <EnterSizesForm
            defaultValues={values}
            setFormSteps={setFormSteps}
            handleChange={(formData) => {
              setFieldValue('hasSize', formData.hasSize)
              setFieldValue('sizes', formData.sizes)
            }}
          />
        )}

        {/* has variations starts */}
        {formSteps === 3 && (
          <EnterVariationForm
            defaultValues={values}
            setFormSteps={setFormSteps}
            handleChange={(formData) => {
              setFieldValue('hasVariations', formData.hasVariations)
              setFieldValue('variations', formData.variations)
              setFieldValue('variablesSubproducts', formData.variablesSubproducts)
            }}
          />
        )}

        {/* has subproducts starts */}
        {formSteps === 4 && (
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
        {formSteps === 5 && (
          <EnterColourForm
            defaultValues={values}
            setFormSteps={setFormSteps}
            handleChange={(formData) => {
              setFieldValue('hasColor', formData.hasColor)
              setFieldValue('colors', formData.colors)
            }}
          />
        )}

        {/* has design */}
        {formSteps === 6 && (
          <EnterDesignForm
            defaultValues={values}
            setFormSteps={setFormSteps}
            handleChange={(formData) => {
              setFieldValue('hasDesign', formData.hasDesign)
              setFieldValue('designs', formData.designs)
            }}
            isLoading={editing ? editingCategory : creatingCategory}
            onClick={() => {
              handleSubmit()
              if (touched && errors) {
                for (const field in errors) {
                  toastUI.error(errors[field])
                }
              }
            }}
            buttonText={editing ? 'Edit category' : 'Create category'}
          />
        )}
      </div>
    </div>
  )
}
