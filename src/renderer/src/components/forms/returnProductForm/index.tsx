import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { useEffect, useState } from 'react'
import { SelectCategory } from './enterCategory'
import { SelectColor } from './enterColor'
import { SelectDesign } from './enterDesign'
import { SelectModel } from './enterModel'
import { SubProductQuantities } from './enterSubProduct'
import { SelectReturnDisposition } from './productStatus'
import { SelectSubCategory } from './selectSubcategory'
import './styles.scss'
import { Summary } from './summary'

const ReturnProductForm = () => {
  const [formSteps, setFormSteps] = useState<number>(1)

  const {
    mutateAsync: getProducts,
    data: productData,
    isPending: isGettingProducts
  } = useReturnAllProducts()

  // const [categoryData, setCategoryData] = useState<SingleCategoryResponse>()
  const [formData, setFormData] = useState<ReturnedProductType>({
    category: '',
    productId: '',
    subcategory: '',
    design: '',
    color: '',
    subproducts: [],
    returnDisposition: '',
    quantity: 1,
    categoryData: undefined
  })

  useEffect(() => {
    getProducts({
      categoryId: formData.category,
      subCategoryName: formData.subcategory
    })
  }, [formData.category, formData.subcategory])

  const onSubmit = () => {}

  // fn:Go to next form
  const fnSetFormStep = () => {
    const categoryData = formData.categoryData

    if (formSteps === 1)
      return categoryData?.hasSubcategories
        ? setFormSteps(2)
        : categoryData?.hasModel
          ? setFormSteps(3)
          : setFormSteps(7)

    if (formSteps === 2) return categoryData?.hasModel ? setFormSteps(3) : setFormSteps(7)

    if (formSteps === 3) return categoryData?.hasSubProducts ? setFormSteps(4) : setFormSteps(7)

    if (formSteps === 4) return categoryData?.hasColor ? setFormSteps(5) : setFormSteps(7)

    if (formSteps === 5) return setFormSteps(6)
    if (formSteps === 6) return setFormSteps(7)
    if (formSteps === 7) return setFormSteps(8)
  }

  //fn: Go back to previous form
  const goToPrevForm = () => {
    const categoryData = formData.categoryData

    const { hasModel, hasSubcategories, hasSubProducts, hasColor } = categoryData!

    if (formSteps === 2) return setFormSteps(1)

    if (formSteps === 3) return hasSubcategories ? setFormSteps(2) : setFormSteps(1)

    if (formSteps === 4)
      return hasModel ? setFormSteps(3) : hasSubcategories ? setFormSteps(2) : setFormSteps(1)

    if (formSteps === 5)
      return hasSubProducts
        ? setFormSteps(4)
        : hasModel
          ? setFormSteps(3)
          : hasSubcategories
            ? setFormSteps(2)
            : setFormSteps(1)

    if (formSteps === 6)
      return hasColor
        ? setFormSteps(5)
        : hasSubProducts
          ? setFormSteps(4)
          : hasModel
            ? setFormSteps(3)
            : hasSubcategories
              ? setFormSteps(2)
              : setFormSteps(1)

    if (formSteps === 7) return setFormSteps(6)

    if (formSteps === 8) return setFormSteps(7)
  }

  return (
    <div className="returnedGoodsForm">
      {formSteps === 1 && (
        <SelectCategory
          formData={formData}
          setFormData={setFormData}
          handleProceed={fnSetFormStep}
        />
      )}

      {/* sizes */}
      {formSteps === 2 && (
        <SelectSubCategory
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          categoryData={formData.categoryData!}
        />
      )}

      {formSteps === 3 && (
        <SelectModel
          formData={formData}
          setFormData={setFormData}
          prevStep={goToPrevForm}
          handleProceed={fnSetFormStep}
        />
      )}

      {/* Subproduct */}
      {formSteps === 4 && (
        <SubProductQuantities
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
        />
      )}

      {/* Color */}
      {formSteps === 5 && (
        <SelectColor
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          categoryData={formData.categoryData!}
        />
      )}

      {/* Design */}
      {formSteps === 6 && (
        <SelectDesign
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          categoryData={formData.categoryData!}
        />
      )}

      {/* status */}
      {formSteps === 7 && (
        <SelectReturnDisposition
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
        />
      )}

      {/* Summary */}
      {formSteps === 8 && (
        <Summary
          formData={formData}
          nextStep={fnSetFormStep}
          handleSubmit={onSubmit}
          categoryData={formData.categoryData!}
        />
      )}
    </div>
  )
}

export default ReturnProductForm
