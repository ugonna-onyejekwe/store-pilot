import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { SelecInput } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'

type SelectSizeTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  productData: ProductResponse
  isLoading: boolean
}

export const SelectSize = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isLoading,
  productData
}: SelectSizeTypes) => {
  const initialValues = {
    size: formData.size
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, size: values.size })
    nextStep()
  }

  const { touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    // validationSchema: addPro_selectCategorySchema,
    onSubmit
  })

  return (
    <>
      {!isLoading && (
        <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
          <form onSubmit={handleSubmit} className="form">
            <div className="form_container">
              <SelecInput
                placeholder="Select size"
                onChange={setFieldValue}
                options={productData?.sizes?.map((i) => ({ label: i.name, value: i.id }))}
                name="size"
                id="size"
                label="Select product size"
                touched={touched.size}
                errorMsg={errors.size}
              />
            </div>

            <div className="btn btn_multi">
              <Button text={'Back'} varient="outline" onClick={prevStep} />

              <Button text={'Proceed'} type="submit" />
            </div>
          </form>
        </motion.div>
      )}
    </>
  )
}
