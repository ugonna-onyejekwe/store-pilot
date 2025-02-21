import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { SelecInput } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'

type SelectCategoryType = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  setFormStep: (value: number) => void
}

export const SelectCategory = ({ formData, setFormData, setFormStep }: SelectCategoryType) => {
  const { CategoriesData, isPending: gettingCategories } = useGetCategories()

  const initialValues = {
    category: formData.category
  }

  const onSubmit = (values) => {
    setFormData({ ...formData, category: values.category })
    setFormStep(2)
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
            placeholder="Select category"
            onChange={setFieldValue}
            options={CategoriesData!}
            isLoading={gettingCategories}
            name="category"
            id="category"
            label="Select product category"
            touched={touched.category}
            errorMsg={errors.category}
          />
        </div>

        <div className="btn btn_single">
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
