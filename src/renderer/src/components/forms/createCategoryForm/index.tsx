import { useCreateCategory } from '@renderer/apis/categories/createCategory'
import { useEditCategory } from '@renderer/apis/categories/editCategory'
import { useReturnAllCategories } from '@renderer/apis/categories/getCategories'
import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { toastUI } from '@renderer/components/ui/toast'
import { getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddCategoryFormSchema } from '../schemas'
import { EnterColourForm } from './enterColours'
import { EnterDesignForm } from './enterDesigns'
import { EnterCategorynameForm } from './enterName'
import { EnterSizesForm } from './enterSizesform'
import { EnterSubProductForm } from './enterSubProducts'
import './style.scss'

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
  const { mutate: refetchCategories } = useReturnAllCategories()
  const { mutateAsync: EditCategory, isPending: editingCategory } = useEditCategory()
  const { mutateAsync: createCategory, isPending: creatingCategory } = useCreateCategory()
  const editing = actionType && actionType === 'edit' ? true : false
  const navigate = useNavigate()
  const [formSteps, setFormSteps] = useState(1)

  const initialvalues = {
    name: editing ? categoryData?.name : '',
    hasModel: editing ? categoryData?.hasModel : false,
    hasSize: editing ? categoryData?.hasSize : false,
    hasColor: editing ? categoryData?.hasColor : false,
    hasDesign: editing ? categoryData?.hasDesign : false,
    hasSubProducts: editing ? categoryData?.hasSubProducts : false,
    sizes: editing ? categoryData?.formatedListOfSizes : '',
    subProducts: editing ? categoryData?.formatedListOfSubproducts : [],
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
      toastUI.error(getError(error))
    }
  }

  const { errors, touched, handleSubmit, resetForm, values, setFieldValue } = useFormik({
    initialValues: { ...initialvalues },
    validationSchema: AddCategoryFormSchema,
    onSubmit
  })

  return (
    <div>
      {formSteps === 1 && (
        <EnterCategorynameForm
          // @ts-expect-error: expect undefined value
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('name', formData.name)
            setFieldValue('hasModel', formData.hasModel)
          }}
        />
      )}

      {/* has sizes starts */}
      {formSteps === 2 && (
        <EnterSizesForm
          // @ts-expect-error: expect undefined value
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasSize', formData.hasSize)
            setFieldValue('sizes', formData.sizes)
          }}
        />
      )}

      {/* has subproducts starts */}
      {formSteps === 3 && (
        <EnterSubProductForm
          // @ts-expect-error: expect undefined value
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
          // @ts-expect-error: expect undefined value
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={(formData) => {
            setFieldValue('hasColor', formData.hasColor)
            setFieldValue('colors', formData.colors)
          }}
        />
      )}

      {/* has design */}
      {formSteps === 5 && (
        <EnterDesignForm
          // @ts-expect-error: expect undefined value
          defaultValues={values}
          setFormSteps={setFormSteps}
          handleChange={async (formData) => {
            await setFieldValue('hasDesign', formData.hasDesign)
            await setFieldValue('designs', formData.designs)
            handleSubmit()
            if (touched && errors) {
              for (const field in errors) {
                toastUI.error(errors[field])
              }
            }
          }}
          isLoading={editing ? editingCategory : creatingCategory}
          buttonText={editing ? 'Edit category' : 'Create category'}
        />
      )}
    </div>
  )
}
