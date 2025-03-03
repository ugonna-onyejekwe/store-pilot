import Button from '@renderer/components/ui/Button'
import { BooleanInput, Input } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { EnterSubCategories } from './schema'

type EnterSubCategoriesFormProps = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterSubCategoriesForm = ({
  defaultValues,
  handleChange: setValues,
  setFormSteps
}: EnterSubCategoriesFormProps) => {
  const initialValues = {
    subcategories: defaultValues.subcategories,
    hasSubcategories: defaultValues.hasSubcategories
  }

  const onSubmit = (values) => {
    const subCategories = values.subcategories
      .split(',')
      .filter(Boolean)
      .map((i) => i.trim().toLowerCase())

    if (values.hasSubcategories) {
      const duplicatedValues = subCategories.find((firstLvlCat, firstkey) => {
        return subCategories.find((SecondLvlCat, secondKey) => {
          if (SecondLvlCat === firstLvlCat && firstkey !== secondKey) {
            return firstLvlCat
          }

          return null
        })
      })

      if (!duplicatedValues) {
        setValues(values)
        setFormSteps(3)
        return
      }

      toastUI.error("Can't have two subcategory with same name")
      return
    }

    setValues(values)
    setFormSteps(3)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterSubCategories,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <BooleanInput
            label="Does this category have sub-categories?"
            value={values.hasSubcategories}
            onChange={setFieldValue}
            name="hasSubcategories"
          />

          {values.hasSubcategories && (
            <Input
              label="Enter sub-categories separating each with a comma(',')."
              placeholder="sub cat 1, sub cat 2 ..."
              value={values.subcategories}
              onChange={handleChange('subcategories')}
              touched={touched.subcategories}
              errorMsg={errors.subcategories}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(1)} varient="outline" />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
