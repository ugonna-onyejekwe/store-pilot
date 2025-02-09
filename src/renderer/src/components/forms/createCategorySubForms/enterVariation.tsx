import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterVariationSchema } from '../schemas'

type EnterVariationFormTypes = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterVariationForm = ({
  defaultValues,
  setFormSteps,
  handleChange: setValues
}: EnterVariationFormTypes) => {
  const initialValues = {
    hasVariations: defaultValues.hasVariations,
    variations: defaultValues.variations,
    variablesSubproducts: defaultValues.variablesSubproducts
  }

  const onSubmit = (values) => {
    setValues(values)
    setFormSteps(4)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterVariationSchema,
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
            label="Does this category have variations?"
            value={values.hasVariations}
            onChange={setFieldValue}
            name="hasVariations"
          />

          {values.hasVariations && (
            <Input
              label="Enter category variations separating each with a comma(',')."
              placeholder="Variation 1, Variation 2, Variation 3,...."
              value={values.variations}
              onChange={handleChange('variations')}
              touched={touched.variations}
              errorMsg={errors.variations}
            />
          )}

          {values.hasVariations && (
            <Input
              label="List products that each variation is supposed to have separating each with a comma(',')."
              placeholder="Table, Chair"
              value={values.variablesSubproducts}
              onChange={handleChange('variablesSubproducts')}
              touched={touched.variablesSubproducts}
              errorMsg={errors.variablesSubproducts}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(2)} varient="outline" />

          <Button text={values.hasVariations === false ? 'Skip' : 'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
