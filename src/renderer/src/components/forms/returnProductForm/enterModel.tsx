import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { SelecInput } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type SelectModelTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  handleProceed: (values) => void
  prevStep: () => void
  isLoading: boolean
}

export const SelectModel = ({
  formData,
  setFormData,
  handleProceed,
  prevStep,
  isLoading
}: SelectModelTypes) => {
  const {
    mutateAsync: getProductData,
    data: productData,
    isPending: isGettingProduct
  } = useReturnAllProducts()
  useEffect(() => {
    getProductData({ categoryId: formData.category })
      .then(() => {
        if (productData?.length === 0) toastUI.error('There is no product under this category')
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const initialValues = {
    productId: formData.productId
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, productId: values.productId })
    handleProceed(values)
  }

  const { touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    // validationSchema: addPro_selectCategorySchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <SelecInput
            placeholder="Select model"
            onChange={setFieldValue}
            options={productData?.map((i) => ({ label: i.model, value: i.productId })) ?? []}
            isLoading={isGettingProduct}
            name="productId"
            id="productId"
            label="Select product model"
            touched={touched.productId}
            errorMsg={errors.productId}
          />
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={prevStep} />

          <Button text={'Proceed'} type="submit" isLoading={isLoading} />
        </div>
      </form>
    </motion.div>
  )
}
