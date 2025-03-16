import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { SelectCategorySchema } from './schema'

type SelectCategoryType = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  handleProceed: () => void
  // setCategoryData: (values: SingleCategoryResponse) => void
  // categoryData: SingleCategoryResponse
}

export const SelectCategory = ({
  formData,
  setFormData,
  handleProceed
  // setCategoryData,
  // categoryData: defaultCategoryData
}: SelectCategoryType) => {
  const {
    isPending: isgettingCategory,
    data: categoryData,
    mutateAsync: getCategory
  } = useReturnSingleCategory()

  const { CategoriesData, isPending: gettingCategories } = useGetCategories()

  const initialValues = {
    category: formData.category
  }

  const onSubmit = (values) => {
    getCategory({ id: values.category })
  }

  const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: SelectCategorySchema,
    onSubmit
  })

  useEffect(() => {
    const init = async () => {
      if (categoryData) {
        formData.categoryData = categoryData
        formData.category = values.category
        setFormData({ ...formData })

        handleProceed()
      }
    }

    init()
  }, [categoryData])

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
          <Button text={'Proceed'} type="submit" isLoading={isgettingCategory} />
        </div>
      </form>
    </motion.div>
  )
}
