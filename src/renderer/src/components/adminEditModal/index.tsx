import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { WhatToEditSchema } from '../forms/schemas'
import { SelecInput } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import './styles.scss'

export const EditModal = ({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) => {
  const navigate = useNavigate()
  const initialValues = { whatToEdit: '', categoryId: '' }
  const { CategoriesData, isPending: categriesListLoading } = useGetCategories()

  const onSubmit = async (values) => {
    const { whatToEdit, categoryId } = values

    if (!whatToEdit) return toastUI.error('Pls select an option')

    if (whatToEdit.toLowerCase() === 'category' && !categoryId)
      return toastUI.error('Pls select a category')

    if (categoryId && whatToEdit.toLowerCase() === 'category')
      return navigate(`/create-category/edit/${categoryId}`)
  }

  const { errors, touched, handleSubmit, setFieldValue, values } = useFormik({
    initialValues,
    validationSchema: WhatToEditSchema,
    onSubmit
  })

  const SelectWhatToEditOptions = [
    {
      label: 'Category',
      value: 'Category'
    },
    {
      label: 'Product',
      value: 'Product'
    }
  ]

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} isCloseable className="admin_edit_modal">
      <h3>Fill in form to proceed</h3>

      <form onSubmit={handleSubmit}>
        <SelecInput
          label="What would you like to edit?"
          options={SelectWhatToEditOptions}
          name="whatToEdit"
          id="whatToEdit"
          onChange={setFieldValue}
          errorMsg={errors.whatToEdit}
          touched={touched.whatToEdit}
          placeholder="Select an option"
        />

        {values.whatToEdit.toLowerCase() === 'category' && (
          <SelecInput
            label="Select category you want to edit"
            options={CategoriesData!}
            name="categoryId"
            id="categoryId"
            onChange={setFieldValue}
            errorMsg={errors.categoryId}
            touched={touched.categoryId}
            isLoading={categriesListLoading}
            placeholder="Select an option"
          />
        )}
        <div className="btn">
          <Button text="Proceed" type="submit" />
        </div>
      </form>
    </AlertModal>
  )
}
