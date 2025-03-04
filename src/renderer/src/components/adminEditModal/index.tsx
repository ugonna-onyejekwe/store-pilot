import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { WhatToEditSchema } from '../forms/schemas'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { SelecInput } from '../ui/inputs'
import { toastUI } from '../ui/toast'
import './styles.scss'

export const EditModal = ({
  open,
  onOpenChange,
  actionType
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  actionType: 'edit' | 'delete'
}) => {
  const navigate = useNavigate()

  const { CategoriesData, isPending: categriesListLoading } = useGetCategories()
  const {
    mutateAsync: getProductData,
    data: productData,
    isPending: isGettingProduct
  } = useReturnAllProducts()

  // Initial values
  const initialValues = { whatToEdit: '', categoryId: '', productCategory: '', product: '' }

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

  // Onsubmit fn
  const onSubmit = async (values) => {
    const { whatToEdit, categoryId, productCategory, product } = values

    // Validate if category to edit details is complete
    if (whatToEdit.toLowerCase() === 'category' && !categoryId)
      return toastUI.error('Category ID is required')

    if (whatToEdit.toLowerCase() === 'category' && categoryId) {
      actionType === 'edit'
        ? navigate(`/create-category/edit/${categoryId}`)
        : navigate(`/delete-category/${categoryId}`)
      return resetForm()
    }

    // Validate if product to edit details is complete
    if (whatToEdit.toLowerCase() === 'product' && (!productCategory || !product))
      return toastUI.error('Pls fill in all inputs')

    if (whatToEdit.toLowerCase() === 'product' && (productCategory || product)) {
      actionType === 'edit'
        ? navigate(`/add-product/edit/${productCategory}/${product}`)
        : navigate(`/delete-product/${productCategory}/${product}`)
      return resetForm()
    }
  }

  const { errors, touched, handleSubmit, setFieldValue, values, resetForm } = useFormik({
    initialValues,
    validationSchema: WhatToEditSchema,
    onSubmit
  })

  useEffect(() => {
    const fetchData = () => {
      getProductData({ categoryId: values.productCategory })
        .then(() => {
          if (productData?.length === 0) toastUI.error('There is no product under this category')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    if (values.productCategory) fetchData()
  }, [values.productCategory])

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} isCloseable className="admin_edit_modal">
      <h3>Fill in form to proceed</h3>

      <form onSubmit={handleSubmit}>
        <SelecInput
          label={`What would you like to ${actionType}?`}
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
            label={`Select category you want to ${actionType}`}
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

        {values.whatToEdit.toLowerCase() === 'product' && (
          <SelecInput
            label={`Select  category of this product you want to ${actionType}`}
            options={CategoriesData!}
            name="productCategory"
            id="productCategory"
            onChange={setFieldValue}
            errorMsg={errors.productCategory}
            touched={touched.productCategory}
            isLoading={categriesListLoading}
            placeholder="Select an option"
          />
        )}

        {values.whatToEdit.toLowerCase() === 'product' && (
          <SelecInput
            label={`Select product  you want to ${actionType}`}
            options={productData?.map((i) => ({ label: i.model, value: i.productId })) ?? []}
            name="product"
            id="product"
            onChange={setFieldValue}
            errorMsg={errors.product}
            touched={touched.product}
            isLoading={isGettingProduct}
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
