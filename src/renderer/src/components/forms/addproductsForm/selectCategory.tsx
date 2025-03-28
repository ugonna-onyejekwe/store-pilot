import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import Button from '@renderer/components/ui/Button'
import { SelecInput } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { addPro_selectCategorySchema } from '../schemas'

type SelectCategoryType = {
  defaultValues: AddProductDefaultValueTypes
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
  nextformFn: () => void
  setFormSteps: (number) => void
}

export const SelectCategory = ({
  defaultValues,
  setDefaultValues,
  nextformFn,
  setFormSteps
}: SelectCategoryType) => {
  const { CategoriesData, isPending: gettingCategories } = useGetCategories()

  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()

  const initialValues = {
    category: defaultValues.category
  }

  const onSubmit = async (values) => {
    await getCategoryData({
      id: values.category
    })
  }

  const { values, touched, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: addPro_selectCategorySchema,
    onSubmit
  })

  useEffect(() => {
    if (categoryData) {
      defaultValues.categoryData = categoryData
      defaultValues.category = values.category
      setDefaultValues({ ...defaultValues })

      if (categoryData.hasModel === false) {
        setFormSteps(4)
        return
      }

      nextformFn()
    }
  }, [categoryData])

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <SelecInput
            placeholder="Select category"
            defaultValue={defaultValues.category}
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
          <Button text={'Proceed'} type="submit" isLoading={isLoadingCategoryData} />
        </div>
      </form>
    </motion.div>
  )
}
