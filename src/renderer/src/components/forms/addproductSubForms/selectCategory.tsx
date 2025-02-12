import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { SelecInput } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterColorsSchema } from '../schemas'

type SelectCategoryType = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  isLoading: boolean
}

export const SelectCategory = ({ handleProceed, defaultValues, isLoading }: SelectCategoryType) => {
  const { CategoriesData, isPending: getCategories } = useGetCategories()

  const initialValues = {
    category: defaultValues.category
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { touched, errors, handleSubmit, setFieldValue } = useFormik({
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
          <SelecInput
            placeholder="Select category"
            onChange={setFieldValue}
            options={CategoriesData!}
            isLoading={getCategories}
            name="category"
            id="category"
            label="Select product category"
            touched={touched.category}
            errorMsg={errors.category}
          />
        </div>

        <div className="btn btn_single">
          <Button text={'Proceed'} type="submit" isLoading={isLoading} />
        </div>
      </form>
    </motion.div>
  )
}
