import Button from '@renderer/components/ui/Button'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { EnterSubproductsSchema } from './schema'

type EnterSubProductProps = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  previousFormFn: () => void
}

const EnterSubproducts = ({
  defaultValues,
  handleProceed,
  previousFormFn
}: EnterSubProductProps) => {
  const onSubmit = (values) => {
    const productAvailable = values.subProducts.find((i) => i.available === true)

    if (!productAvailable) {
      toastUI.error('Atleast one sub product sub be available')
      return
    }

    handleProceed(values)
  }

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: { subProducts: defaultValues.subProducts },
    validationSchema: EnterSubproductsSchema,
    onSubmit
  })

  useEffect(() => {
    if (defaultValues.subProducts.length === 0) {
      if (defaultValues?.categoryData?.hasSubcategories) {
        const filteredSubproducts = defaultValues.categoryData.subProducts.filter(
          (i) => i.subCategoryName === defaultValues.subcategory
        )

        const subproducts = filteredSubproducts.map((i) => i.subProducts)

        setFieldValue(
          'subProducts',
          subproducts?.[0]?.map((i) => ({ ...i, available: true }))
        )

        return
      }

      setFieldValue(
        'subProducts',
        defaultValues.categoryData?.subProducts.map((i) => ({ ...i, available: true }))
      )
    }
  }, [])

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container subproduct_form_con">
          <h3>Check available of all sub-products under this category</h3>
          <div className="box_con">
            {values.subProducts.map((i, key) => {
              return (
                <div key={key} className="box">
                  <input
                    type="checkbox"
                    id={i.name}
                    className="checkInput"
                    checked={i.available === true}
                    onChange={(e) => {
                      const newValues = values.subProducts.map((product, index) => {
                        if (index === key) {
                          product.available = e.target.checked

                          return product
                        }

                        return product
                      })
                      setFieldValue('subProducts', newValues)
                    }}
                  />

                  <label htmlFor={i.name}>{i.name}</label>
                </div>
              )
            })}
          </div>
        </div>

        <div className="btn btn_multi">
          <Button text="Back" varient="outline" onClick={previousFormFn} />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default EnterSubproducts
