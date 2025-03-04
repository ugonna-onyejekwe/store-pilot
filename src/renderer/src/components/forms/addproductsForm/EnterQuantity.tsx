import Button from '@renderer/components/ui/Button'
import { Input } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterQuantitySchema } from './schema'

type EnterQuantityProps = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  previousFormFn: () => void
}

const EnterQuantity = ({ defaultValues, handleProceed, previousFormFn }: EnterQuantityProps) => {
  const onSubmit = (values) => handleProceed(values)

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      totalAvailableProduct: defaultValues.totalAvailableProduct,
      cartoonsPerSet: defaultValues.cartoonsPerSet
    },
    validationSchema: EnterQuantitySchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <Input
            label={'Total number of product available'}
            placeholder="Enter quantity"
            onChange={handleChange('totalAvailableProduct')}
            value={values.totalAvailableProduct}
            errorMsg={errors.totalAvailableProduct}
            touched={touched.totalAvailableProduct}
            type="number"
          />

          <Input
            label={'How many cartoons makes up one set of this product?'}
            placeholder="Enter quantity"
            onChange={handleChange('cartoonsPerSet')}
            value={values.cartoonsPerSet}
            errorMsg={errors.cartoonsPerSet}
            touched={touched.cartoonsPerSet}
            type="number"
          />
        </div>

        <div className="btn btn_multi">
          <Button text="Back" varient="outline" onClick={previousFormFn} />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default EnterQuantity
