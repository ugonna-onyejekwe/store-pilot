import { useCreateCategory } from '@renderer/apis/categories/createCategory'
import { useEditCategory } from '@renderer/apis/categories/editCategory'
import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { toastUI } from '@renderer/components/ui/toast'
import { getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EnterColourForm } from './enterColours'
import { EnterCategorynameForm } from './enterName'
import { EnterSubCategoriesForm } from './enterSubcategories'
import { EnterSubProductForm } from './enterSubProducts'
import { AddCategoryFormSchema } from './schema'
import './style.scss'
import Summary from './summary'

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
  const { mutateAsync: EditCategory, isPending: editingCategory } = useEditCategory()
  const { mutateAsync: createCategory, isPending: creatingCategory } = useCreateCategory()
  const editing = actionType && actionType === 'edit' ? true : false
  const navigate = useNavigate()
  const [formSteps, setFormSteps] = useState(1)

  const initialvalues = {
    name: editing ? categoryData?.name : '',
    hasModel: editing ? categoryData?.hasModel : false,
    hasColor: editing ? categoryData?.hasColor : false,
    hasSubProducts: editing ? categoryData?.hasSubProducts : false,
    subProducts: editing ? categoryData?.formatedListOfSubproducts : [],
    colors: editing ? categoryData?.formatedListOfColors : '',
    designs: editing ? categoryData?.formatedListOfDesigns : '',
    subcategories: editing ? categoryData?.subcategories : '',
    hasSubcategories: editing ? categoryData?.hasSubcategories : false
  }

  const onSubmit = async (values) => {
    try {
      if (editing) {
        EditCategory({ ...values, id: categoryId })
          .then(() => {
            resetForm()
            toastUI.success('Category edited successfully')
            setFormSteps(1)
            values = initialvalues
          })
          .then(() => navigate('/admin'))

        return
      }

      createCategory(values)
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
    validationSchema: AddCategoryFormSchema,
    onSubmit
  })

  return (
    <div className="create_category_form">
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

      {/* has subcategories starts */}
      {formSteps === 2 && (
        <EnterSubCategoriesForm
          // @ts-expect-error: expect undefined value
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
          // @ts-expect-error: expect undefined value
          defaultValues={values}
          isEditing={editing}
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
          handleChange={async (formData) => {
            await setFieldValue('hasColor', formData.hasColor)
            await setFieldValue('colors', formData.colors)
            await setFieldValue('designs', formData.designs)
          }}
        />
      )}

      {/* summary */}
      {formSteps === 5 && (
        <Summary
          // @ts-expect-error: expect undefined value
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
          isLoading={editing ? editingCategory : creatingCategory}
          buttonText={editing ? 'Edit category' : 'Create category'}
        />
      )}
    </div>
  )
}
