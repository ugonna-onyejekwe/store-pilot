import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { SelecInput } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { addPro_selectCategorySchema } from '../schemas'

type SelectCategoryType = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  isLoading: boolean
  data: SingleCategoryResponse
}

export const SelectCategory = ({
  handleProceed,
  data,
  defaultValues,
  isLoading
}: SelectCategoryType) => {
  const { CategoriesData, isPending: getCategories } = useGetCategories()

  const initialValues = {
    category: defaultValues.category
  }

  const onSubmit = (values) => {
    handleProceed(values)
  }

  const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: addPro_selectCategorySchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <SelecInput
            placeholder="Select category"
            defaultValue={defaultValues.category}
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
          <Button
            text={!data ? 'process category' : 'Proceed'}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </form>
    </motion.div>
  )
}
