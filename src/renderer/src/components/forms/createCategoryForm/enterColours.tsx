import Button from '@renderer/components/ui/Button'
import { BooleanInput, Input } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterColorsSchema } from './schema'

type EnterColourFormProps = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterColourForm = ({
  defaultValues,
  handleChange: setValues,
  setFormSteps
}: EnterColourFormProps) => {
  const initialValues = {
    hasColor: defaultValues.hasColor,
    colors: defaultValues.colors,
    designs: defaultValues.designs
  }

  const onSubmit = (values) => {
    setValues(values)
    setFormSteps(5)
  }
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterColorsSchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
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

          {values.hasColor && (
            <Input
              label="Enter category designs separating each with a comma(',')."
              placeholder="Design 1, Design 2, Design 3,...."
              value={values.designs}
              onChange={handleChange('designs')}
              touched={touched.designs}
              errorMsg={errors.designs}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(3)} varient="outline" />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
