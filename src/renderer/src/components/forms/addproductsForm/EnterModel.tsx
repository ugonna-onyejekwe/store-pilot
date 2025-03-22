import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import Button from '@renderer/components/ui/Button'
import { Input, SelecInput } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { EnterModelSchema } from './schema'

interface EnterModelProps {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
  previousFormFn: () => void
}

const EnterModel = ({
  defaultValues,
  handleProceed,
  previousFormFn,
  setDefaultValues
}: EnterModelProps) => {
  const { isPending: isLoadingProducts, mutateAsync: getProducts, data } = useReturnAllProducts()

  const { mutateAsync: getSelectedProduct } = useReturnSingleProduct()

  useEffect(() => {
    if (defaultValues.actionType === 'update') {
      getProducts({
        categoryId: defaultValues.category,
        subCategoryName: defaultValues.subcategory
      })
    }
  }, [])

  useEffect(() => {
    if (data?.length == 0) toastUI.error("You haven't added any product under this category")
  }, [data])

  const onSubmit = (values) => {
    if (defaultValues.actionType === 'update') {
      getSelectedProduct({
        productId: values.model
      }).then((res) => {
        defaultValues.colours = res?.colors.map((i) => ({ ...i, availableQuantity: 0 }))

        // @ts-ignore:undefined
        defaultValues.designs = res?.designs.map((i) => ({
          ...i,
          designs: i.designs.map((j) => ({ ...j, availableQuantity: 0, available: true }))
        }))

        setDefaultValues({ ...defaultValues })
        handleProceed(values)
      })

      return
    }

    handleProceed(values)
  }

  const { values, handleChange, setFieldValue, errors, touched, handleSubmit } = useFormik({
    initialValues: { model: defaultValues.model },
    validationSchema: EnterModelSchema,
    onSubmit
  })

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          {defaultValues.actionType === 'new' ? (
            <Input
              label="Enter model"
              placeholder="Enter model .."
              onChange={handleChange('model')}
              value={values.model}
              errorMsg={errors.model}
              touched={touched.model}
            />
          ) : (
            <SelecInput
              placeholder="Select product model"
              defaultValue={defaultValues.model}
              onChange={setFieldValue}
              // @ts-ignore:undefined
              options={data?.map((i) => ({ label: i.model, value: i.productId })) ?? []}
              name="model"
              id="model"
              label="Select product model"
              touched={touched.model}
              errorMsg={errors.model}
              isLoading={isLoadingProducts}
            />
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" varient="outline" onClick={previousFormFn} />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default EnterModel
