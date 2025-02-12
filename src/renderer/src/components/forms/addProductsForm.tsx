import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useEffect, useState } from 'react'
import { EnterModal } from './addproductSubForms/EnterModal'
import { SelectCategory } from './addproductSubForms/selectCategory'
import SizeInput from './addproductSubForms/SizesInput'
import SubProductForm from './addproductSubForms/SubProductForm'

const AddProductForm = () => {
  const [formSteps, setFormSteps] = useState(1)

  const [defaultValues, setDefaultValues] = useState<AddProductDefaultValueTypes>({
    category: '',
    modal: '',
    sizes: [],
    subProducts: []
  })

  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()

  // initial default values

  useEffect(() => {
    // setting Default values start======================
    // SIZES
    const formatedSizes = categoryData?.formatedListOfSizes.split(',').map((i) => ({
      name: i,
      quantity: 0
    }))

    console.log(formatedSizes)

    //SUB-PRODUCTS
    const formatedSubProducts = categoryData?.formatedListOfSubproducts.split(',').map((i) => ({
      name: i,
      quantity: 0
    }))

    setDefaultValues({ ...defaultValues, sizes: formatedSizes, subProducts: formatedSubProducts })

    // setting Default values ends======================
  }, [categoryData])

  useEffect(() => {
    console.log(defaultValues, 'all')
  }, [defaultValues])

  const setFieldValue = (fieldname: string, value: any) => {
    setDefaultValues({ ...defaultValues, [fieldname]: value })
  }

  const onSubmit = () => {}

  return (
    <div className="form">
      {formSteps === 1 && (
        <SelectCategory
          defaultValues={defaultValues}
          isLoading={isLoadingCategoryData}
          handleProceed={(formData) => {
            setFieldValue('category', formData.category)
            getCategoryData({ id: formData.category }).then(() => {
              setFormSteps(2)
            })
          }}
        />
      )}
      {/* TODO: Check if has sizes before pushing to next step */}
      {formSteps === 2 && (
        <EnterModal
          defaultValues={defaultValues}
          setFormSteps={setFormSteps}
          handleProceed={(formData) => {
            setFieldValue('modal', formData.modal)
            setFormSteps(3)
          }}
        />
      )}

      {formSteps === 3 && (
        <SizeInput
          defaultValues={defaultValues}
          handleProceed={() => {
            setFormSteps(4)
          }}
          setFormSteps={setFormSteps}
          setDefaultValues={setDefaultValues}
        />
      )}

      {formSteps === 4 && (
        <SubProductForm
          defaultValues={defaultValues}
          setFormSteps={setFormSteps}
          setDefaultValues={setDefaultValues}
          handleProceed={(formData) => {
            setFieldValue('subProducts', formData.subProducts)
            setFormSteps(5)
          }}
        />
      )}
    </div>
  )
}

export default AddProductForm
