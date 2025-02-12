import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterDesignSchema } from '../schemas'

type EnterVariationFormTypes = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
  onClick: () => void
  isLoading: boolean
  buttonText: string
}

export const EnterDesignForm = ({
  defaultValues,
  handleChange: setValues,
  setFormSteps,
  onClick,
  isLoading,
  buttonText
}: EnterVariationFormTypes) => {
  const initialValues = {
    hasDesign: defaultValues.hasDesign,
    designs: defaultValues.designs
  }

  const onSubmit = (values) => {
    setValues(values)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterDesignSchema,
    onSubmit
  })

  return (
    <motion.div
      variants={createCategoryformVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <BooleanInput
            label="Does this category have designs?"
            value={values.hasDesign}
            onChange={setFieldValue}
            name="hasDesign"
          />

          {values.hasDesign && (
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
          <Button text="Back" onClick={() => setFormSteps(4)} varient="outline" />

          <Button text={buttonText} isLoading={isLoading} type="submit" onClick={onClick} />
        </div>
      </form>
    </motion.div>
  )
}
