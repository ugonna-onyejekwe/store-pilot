import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useEffect, useState } from 'react'
import { ColorInput } from './ColorInput'
import { DesignInput } from './designInput'
import { EnterModal } from './EnterModal'
import { SelectCategory } from './selectCategory'
import SizeInput from './SizesInput'
import './styles.scss'
import SubProductForm from './SubProductForm'
import { Summary } from './summary'

const AddProductForm = () => {
  const [formSteps, setFormSteps] = useState(1)

  const [defaultValues, setDefaultValues] = useState<AddProductDefaultValueTypes>({
    category: '',
    model: '',
    sizes: [],
    subProducts: [],
    cartoonQuantity: 1,
    colors: [],
    designs: [],
    colorCustomInputsIndex: [],
    designCustomInputsIndex: [],
    totalQuantity: 0
  })

  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()

  useEffect(() => {
    console.log(defaultValues, 'recent change')
  }, [defaultValues])

  // initial default values
  useEffect(() => {
    // setting Default values start======================
    // SIZES
    const formatedSizes = categoryData?.formatedListOfSizes.split(',').map((i) => ({
      name: i,
      quantity: 0
    }))

    // SUBPRODUCTS
    const formatedSubProducts = categoryData?.formatedListOfSubproducts.map((i) => ({
      ...i,
      available: true
    }))

    // COLORS
    const formatedColors = categoryData?.formatedListOfColors.split(',').map((i) => ({
      name: i,
      quantity: 0
    }))

    // DESIGNS
    const formatedDesigns = categoryData?.formatedListOfDesigns.split(',').map((i) => ({
      name: i,
      quantity: 0
    }))

    setDefaultValues({
      ...defaultValues,
      // @ts-expect-error: expect undefined value
      sizes: formatedSizes,
      // @ts-expect-error: expect undefined value
      subProducts: formatedSubProducts,
      // @ts-expect-error: expect undefined value
      colors: formatedColors,
      // @ts-expect-error: expect undefined value
      designs: formatedDesigns
    })

    // setting Default values ends======================
  }, [categoryData])

  // fn:Go to next form
  const fnSetFormStep = () => {
    if (formSteps === 1) return setFormSteps(2)

    if (formSteps === 2) {
      return categoryData?.hasSize
        ? setFormSteps(3)
        : categoryData?.hasSubProducts
          ? setFormSteps(4)
          : categoryData?.hasColor
            ? setFormSteps(5)
            : categoryData?.hasDesign
              ? setFormSteps(6)
              : setFormSteps(7)
    }

    if (formSteps === 3) {
      return categoryData?.hasSubProducts
        ? setFormSteps(4)
        : categoryData?.hasColor
          ? setFormSteps(5)
          : categoryData?.hasDesign
            ? setFormSteps(6)
            : setFormSteps(7)
    }

    if (formSteps === 4) {
      return categoryData?.hasColor
        ? setFormSteps(5)
        : categoryData?.hasDesign
          ? setFormSteps(6)
          : setFormSteps(7)
    }

    if (formSteps === 5) {
      return categoryData?.hasDesign ? setFormSteps(6) : setFormSteps(7)
    }

    if (formSteps === 6) {
      return setFormSteps(7)
    }
  }

  //fn: Go back to previous form
  const goToPrevForm = () => {
    const { hasModel, hasSize, hasSubProducts, hasColor, hasDesign } = categoryData!

    if (formSteps === 2) return setFormSteps(1)

    if (formSteps === 3) return setFormSteps(2)

    if (formSteps === 4) return hasSize ? setFormSteps(3) : setFormSteps(2)

    if (formSteps === 5) {
      return hasSubProducts ? setFormSteps(4) : hasSize ? setFormSteps(3) : setFormSteps(2)
    }

    if (formSteps === 6) {
      return hasColor
        ? setFormSteps(5)
        : hasSubProducts
          ? setFormSteps(4)
          : hasSize
            ? setFormSteps(3)
            : setFormSteps(2)
    }

    if (formSteps === 7) {
      return hasDesign
        ? setFormSteps(6)
        : hasColor
          ? setFormSteps(5)
          : hasSubProducts
            ? setFormSteps(4)
            : hasSize
              ? setFormSteps(3)
              : setFormSteps(2)
    }
  }

  const onSubmit = () => {}

  return (
    <div>
      {formSteps === 1 && (
        <SelectCategory
          defaultValues={defaultValues}
          isLoading={isLoadingCategoryData}
          data={categoryData!}
          handleProceed={(formData) => {
            setDefaultValues({ ...defaultValues, category: formData.category })
            getCategoryData({ id: formData.category }).then(async () => {
              fnSetFormStep()
            })
          }}
        />
      )}

      {formSteps === 2 && (
        <EnterModal
          defaultValues={defaultValues}
          backFn={goToPrevForm}
          categoryData={categoryData!}
          handleProceed={async (formData) => {
            setDefaultValues({
              ...defaultValues,
              cartoonQuantity: formData.cartoonQuantity,
              model: formData.model,
              totalQuantity: formData.totalQuantity
            })

            fnSetFormStep()
          }}
        />
      )}

      {formSteps === 3 && (
        <SizeInput
          defaultValues={defaultValues}
          handleProceed={() => {
            fnSetFormStep()
          }}
          backFn={goToPrevForm}
          setDefaultValues={setDefaultValues}
        />
      )}

      {formSteps === 4 && (
        <SubProductForm
          defaultValues={defaultValues}
          backFn={goToPrevForm}
          setDefaultValues={setDefaultValues}
          handleProceed={() => {
            fnSetFormStep()
          }}
        />
      )}

      {formSteps === 5 && (
        <ColorInput
          defaultValues={defaultValues}
          handleProceed={() => {
            fnSetFormStep()
          }}
          backFn={goToPrevForm}
          setDefaultValues={setDefaultValues}
        />
      )}

      {formSteps === 6 && (
        <DesignInput
          defaultValues={defaultValues}
          handleProceed={() => {
            fnSetFormStep()
          }}
          backFn={goToPrevForm}
          setDefaultValues={setDefaultValues}
        />
      )}

      {formSteps === 7 && (
        <Summary
          defaultValues={defaultValues}
          handleProceed={() => {
            fnSetFormStep()
          }}
          backFn={goToPrevForm}
          categoryData={categoryData!}
        />
      )}
    </div>
  )
}

export default AddProductForm
