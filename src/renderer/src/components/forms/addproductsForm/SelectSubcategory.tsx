import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { SelectSubcategorySchema } from './schema'

interface SelectSubcategoryProps {
  categoryData: SingleCategoryResponse
  defaultValues: AddProductDefaultValueTypes
  previousFormFn: () => void
  handleProceed: (values: AddProductDefaultValueTypes) => void
}

const SelectSubcategory = ({
  categoryData,
  defaultValues,
  previousFormFn,
  handleProceed
}: SelectSubcategoryProps) => {
  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { setFieldValue, handleSubmit, errors, touched } = useFormik({
    initialValues: { subcategory: '' },
    validationSchema: SelectSubcategorySchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <SelecInput
            placeholder="Select sub-category"
            defaultValue={defaultValues.subcategory}
            onChange={setFieldValue}
            options={categoryData.subcategories.map((i) => ({ label: i.name, value: i.name }))}
            name="subcategory"
            id="subcategory"
            label="Select product sub-category"
            touched={touched.subcategory}
            errorMsg={errors.subcategory}
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

export default SelectSubcategory
