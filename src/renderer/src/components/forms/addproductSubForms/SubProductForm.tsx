import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterColorsSchema } from '../schemas'

type SizeInputTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  setFormSteps: (value: number) => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

const SubProductForm = ({
  handleProceed,
  setFormSteps,
  setDefaultValues,
  defaultValues
}: SizeInputTypes) => {
  const initialValues = {
    sizes: defaultValues.sizes
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues,
    validationSchema: EnterColorsSchema,
    onSubmit
  })

  const onValueChange = (value, index) => {
    defaultValues.subProducts[index].quantity = value

    setDefaultValues({
      ...defaultValues
    })
  }

  return (
    <motion.div
      variants={createCategoryformVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form onSubmit={handleSubmit} className="sizes_form">
        <div className="form_container">
          <h3>Enter quantity for each sub product</h3>

          <div className="box_con">
            {defaultValues.subProducts.map((i, key) => {
              return (
                <div key={key} className="box">
                  <h5>{i.name}:</h5>{' '}
                  <Input
                    onChange={(e) => onValueChange(e.target.value, key)}
                    value={defaultValues.subProducts[key].quantity}
                    type="number"
                    placeholder="Enter quantity"
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={() => setFormSteps(3)} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default SubProductForm
