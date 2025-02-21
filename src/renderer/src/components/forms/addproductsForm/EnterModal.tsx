import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { useVerifyModelName } from '@renderer/apis/products/verifyModel'
import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
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
  const { actionType } = useParams()
  const editing = actionType && actionType === 'edit' ? true : false
  const { mutateAsync: VerifyModelName, isPending } = useVerifyModelName()

  const initialValues = {
    model: defaultValues.model,
    cartoonQuantity: defaultValues.cartoonQuantity,
    totalQuantity: defaultValues.totalQuantity,
    hasModel: hasModel
  }

  const onSubmit = (values) => {
    if (!editing) {
      VerifyModelName({
        model: values.model,
        categoryId: defaultValues.category
      })
        .then(() => handleProceed(values))
        .catch((error) => {
          console.log(error)
        })
    }

    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: addPro_enterModelSchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
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
            type="number"
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

        <div className={editing ? 'btn btn_single' : `btn btn_multi`}>
          {editing || <Button text={'Back'} varient="outline" onClick={backFn} />}

          <Button text={'Proceed'} type="submit" isLoading={isPending} />
        </div>
      </form>
    </motion.div>
  )
}
