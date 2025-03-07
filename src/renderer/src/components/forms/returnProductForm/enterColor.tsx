import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'

type SelectColorTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  productData: ProductResponse
  isLoading: boolean
}

export const SelectColor = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isLoading,
  productData
}: SelectColorTypes) => {
  const initialValues = {
    color: formData.color
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, color: values.color })
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
                placeholder="Select product colour"
                onChange={setFieldValue}
                options={productData.colors.map((i) => ({ label: i.name, value: i.id }))}
                name="color"
                id="color"
                label="Select product colour"
                touched={touched.color}
                errorMsg={errors.color}
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
