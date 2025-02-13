import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { addPro_totalQuantitySchema } from '../schemas'

type TotalQuantityTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  backFn: () => void
}

export const TotalQuantity = ({ handleProceed, defaultValues, backFn }: TotalQuantityTypes) => {
  const initialValues = {
    totalQuantity: defaultValues.totalQuantity
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: addPro_totalQuantitySchema,
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
          <Input
            placeholder="Enter total number of product"
            onChange={handleChange('totalQuantity')}
            label="Total number of  product available"
            touched={touched.totalQuantity}
            errorMsg={errors.totalQuantity}
            value={values.totalQuantity}
            type="number"
          />
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={backFn} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
