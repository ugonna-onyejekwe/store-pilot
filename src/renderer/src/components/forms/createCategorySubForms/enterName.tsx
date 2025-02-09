import { useVerifyCategoryName } from '@renderer/apis/categories/verifyname'
import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { toastUI } from '@renderer/components/ui/toast'
import { createCategoryformVariants, getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { EnterNameSchema } from '../schemas'

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
  const { actionType } = useParams()
  const editing = actionType === 'edit' ? true : false
  const initialValues = {
    name: defaultValues.name
  }

  const onSubmit = (values) => {
    try {
      if (editing) {
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

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: EnterNameSchema,
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
          <Input
            label="Enter category name"
            placeholder="Name...."
            value={values.name}
            onChange={handleChange('name')}
            touched={touched.name}
            errorMsg={errors.name}
          />
        </div>

        <div className="btn btn_single">
          <Button text="Proceed" type="submit" isLoading={isPending} />
        </div>
      </form>
    </motion.div>
  )
}
