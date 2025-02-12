import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterColorsSchema } from '../schemas'

type SelectCategoryType = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  setFormSteps: (value: number) => void
}

export const EnterModal = ({ handleProceed, defaultValues, setFormSteps }: SelectCategoryType) => {
  const initialValues = {
    modal: defaultValues.modal
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
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
          <Input
            placeholder="Enter modal ..."
            onChange={handleChange('modal')}
            label="Enter product modal"
            touched={touched.modal}
            errorMsg={errors.modal}
            value={values.modal}
          />
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={() => setFormSteps(1)} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
