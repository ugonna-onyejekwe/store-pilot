import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'

type SelectReturnDispositionProps = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
}

export const SelectReturnDisposition = ({
  formData,
  setFormData,
  nextStep,
  prevStep
}: SelectReturnDispositionProps) => {
  const initialValues = {
    returnDisposition: formData.returnDisposition
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, returnDisposition: values.returnDisposition })
    nextStep()
  }

  const { touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    // validationSchema: addPro_selectCategorySchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <SelecInput
            placeholder="Select "
            onChange={setFieldValue}
            options={[
              {
                label: 'Restock (Item is sellable)',
                value: 'restock'
              },
              {
                label: 'Discard (Item is not sellable)',
                value: 'discard'
              }
            ]}
            name="returnDisposition"
            id="returnDisposition"
            label="Choose Return Disposition:"
            touched={touched.returnDisposition}
            errorMsg={errors.returnDisposition}
          />
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={prevStep} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
