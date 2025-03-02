import { useVerifyCategoryName } from '@renderer/apis/categories/verifyname'
import { BooleanInput, Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY, getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterNameSchema } from './schema'

type EnterCategorynameFormType = {
  defaultValues: CreateCategoryFormInitialvalues
  setFormSteps: (value: number) => void
  handleChange: (value: CreateCategoryFormInitialvalues) => void
}

export const EnterCategorynameForm = ({
  defaultValues,
  setFormSteps,
  handleChange: setValues
}: EnterCategorynameFormType) => {
  const { mutateAsync: verifyCategoryName, isPending } = useVerifyCategoryName()
  const initialValues = {
    name: defaultValues.name,
    hasModel: defaultValues.hasModel,
    hasColor: defaultValues.hasColor
  }

  const onSubmit = (values) => {
    try {
      if (values.name === defaultValues.name) {
        setFormSteps(2)
        setValues(values)

        return
      }

      verifyCategoryName({ categoryName: values.name }).then(() => {
        setFormSteps(2)
        setValues(values)
      })
    } catch (error) {
      toastUI.error(getError(error))
      console.log(getError(error), 'error')
    }
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterNameSchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <Input
            label="Enter category name"
            placeholder="Name...."
            value={values.name}
            onChange={handleChange('name')}
            touched={touched.name}
            errorMsg={errors.name}
          />

          <BooleanInput
            label="Does this category have model?"
            value={values.hasModel}
            onChange={setFieldValue}
            name="hasModel"
          />

          <BooleanInput
            label="Does this category have colours?"
            value={values.hasColor}
            onChange={setFieldValue}
            name="hasColor"
          />
        </div>

        <div className="btn btn_single">
          <Button text="Proceed" type="submit" isLoading={isPending} />
        </div>
      </form>
    </motion.div>
  )
}
