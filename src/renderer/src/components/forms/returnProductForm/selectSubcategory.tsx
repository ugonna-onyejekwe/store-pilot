import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { selectSubCategorySchema } from './schema'

type SelectSubCategoryTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  categoryData: SingleCategoryResponse
}

export const SelectSubCategory = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  categoryData
}: SelectSubCategoryTypes) => {
  const initialValues = {
    subcategory: formData.subcategory
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, subcategory: values.subcategory })
    nextStep()
  }

  const { touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: selectSubCategorySchema,
    onSubmit
  })

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <form onSubmit={handleSubmit} className="form">
          <div className="form_container">
            <SelecInput
              placeholder="Select sub-category"
              onChange={setFieldValue}
              options={categoryData?.subcategories?.map((i) => ({ label: i.name, value: i.name }))}
              name="subcategory"
              id="subcategory"
              label="Select product sub-category"
              touched={touched.subcategory}
              errorMsg={errors.subcategory}
            />
          </div>

          <div className="btn btn_multi">
            <Button text={'Back'} varient="outline" onClick={prevStep} />

            <Button text={'Proceed'} type="submit" />
          </div>
        </form>
      </motion.div>
    </>
  )
}
