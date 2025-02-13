import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { addPro_enterModelSchema } from '../schemas'

type EnterModalTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  backFn: () => void
  categoryData: SingleCategoryResponse
}

export const EnterModal = ({
  handleProceed,
  defaultValues,
  backFn,
  categoryData
}: EnterModalTypes) => {
  const { hasModel } = categoryData!

  const initialValues = {
    model: defaultValues.model,
    cartoonQuantity: defaultValues.cartoonQuantity,
    totalQuantity: defaultValues.totalQuantity,
    hasModel: hasModel
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: addPro_enterModelSchema,
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
          {hasModel && (
            <Input
              placeholder="Enter model ..."
              onChange={handleChange('model')}
              label="Enter product model"
              touched={touched.model}
              errorMsg={errors.model}
              value={values.model}
            />
          )}

          <Input
            placeholder="Enter total number ..."
            onChange={handleChange('totalQuantity')}
            label="Total number of products available"
            touched={touched.totalQuantity}
            errorMsg={errors.totalQuantity}
            value={values.totalQuantity}
          />

          {hasModel && (
            <Input
              placeholder="Enter cartoons per product"
              onChange={handleChange('cartoonQuantity')}
              label="Number of cartoons per product"
              touched={touched.cartoonQuantity}
              errorMsg={errors.cartoonQuantity}
              value={values.cartoonQuantity}
              type="number"
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={backFn} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
