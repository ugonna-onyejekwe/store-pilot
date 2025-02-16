import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterSizesSchema } from '../schemas'

type EnterSizesFormType = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterSizesForm = ({
  defaultValues,
  handleChange: setValues,
  setFormSteps
}: EnterSizesFormType) => {
  const initialValues = {
    sizes: defaultValues.sizes,
    hasSize: defaultValues.hasSize
  }

  const onSubmit = (values) => {
    setValues(values)
    setFormSteps(3)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterSizesSchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <BooleanInput
            label="Does this category have sizes?"
            value={values.hasSize}
            onChange={setFieldValue}
            name="hasSize"
          />

          {values.hasSize && (
            <Input
              label="Enter category sizes separating each with a comma(',')."
              placeholder="Size 1, Size 2, Size 3,...."
              value={values.sizes}
              onChange={handleChange('sizes')}
              touched={touched.sizes}
              errorMsg={errors.sizes}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(1)} varient="outline" />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
