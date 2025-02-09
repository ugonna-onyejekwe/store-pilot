import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterSubProductSchema } from '../schemas'

type EnterVariationFormTypes = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterSubProductForm = ({
  defaultValues,
  setFormSteps,
  handleChange: setValues
}: EnterVariationFormTypes) => {
  const initialValues = {
    hasSubProducts: defaultValues.hasSubProducts,
    subProducts: defaultValues.subProducts
  }

  const onSubmit = (values) => {
    setValues(values)
    setFormSteps(5)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterSubProductSchema,
    onSubmit
  })

  return (
    <motion.div
      variants={createCategoryformVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form onSubmit={handleSubmit}>
        <div className="form_container">
          <BooleanInput
            label="Does this category have sub-products?"
            value={values.hasSubProducts}
            onChange={setFieldValue}
            name="hasSubProducts"
          />

          {values.hasSubProducts && (
            <Input
              label="Enter category sub-products separating each with a comma(',')."
              placeholder="Product 1, Product 2, Product 3,...."
              value={values.subProducts}
              onChange={handleChange('subProducts')}
              touched={touched.subProducts}
              errorMsg={errors.subProducts}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(3)} varient="outline" />

          <Button text={values.hasSubProducts === false ? 'Skip' : 'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
