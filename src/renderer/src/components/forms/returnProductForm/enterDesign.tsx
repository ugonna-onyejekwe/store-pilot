import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'

type SelectDesignTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  productData: ProductResponse
  isLoading: boolean
}

export const SelectDesign = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isLoading,
  productData
}: SelectDesignTypes) => {
  const initialValues = {
    design: formData.design
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, design: values.design })
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
                placeholder="Select product design"
                onChange={setFieldValue}
                options={productData.designs.map((i) => ({ label: i.name, value: i.id }))}
                name="design"
                id="design"
                label="Select product design"
                touched={touched.design}
                errorMsg={errors.design}
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
