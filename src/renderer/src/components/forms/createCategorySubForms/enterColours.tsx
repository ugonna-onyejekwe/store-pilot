import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterColorsSchema } from '../schemas'

type EnterVariationFormTypes = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterColourForm = ({
  defaultValues,
  handleChange: setValues,
  setFormSteps
}: EnterVariationFormTypes) => {
  const initialValues = {
    hasColor: defaultValues.hasColor,
    colors: defaultValues.colors
  }

  const onSubmit = (values) => {
    setValues(values)
    setFormSteps(6)
  }
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterColorsSchema,
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
            label="Does this category have colours?"
            value={values.hasColor}
            onChange={setFieldValue}
            name="hasColor"
          />

          {values.hasColor && (
            <Input
              label="Enter category colours separating each with a comma(',')."
              placeholder="Color 1, Color 2, Color 3,...."
              value={values.colors}
              onChange={handleChange('colors')}
              touched={touched.colors}
              errorMsg={errors.colors}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(4)} varient="outline" />

          <Button text={values.hasColor === false ? 'Skip' : 'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
