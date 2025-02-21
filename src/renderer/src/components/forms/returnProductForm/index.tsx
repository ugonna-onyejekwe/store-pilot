import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import { toastUI } from '@renderer/components/ui/toast'
import { getError } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import { SelectCategory } from './enterCategory'
import { SelectColor } from './enterColor'
import { SelectDesign } from './enterDesign'
import { SelectModel } from './enterModel'
import { SelectSize } from './enterSizes'
import { SelectSubProduct } from './enterSubProduct'
import './styles.scss'

const ReturnProductForm = () => {
  const [formSteps, setFormSteps] = useState<number>(1)
  const {
    isPending: isgettingCategory,
    data: categoryData,
    mutateAsync: getCategory
  } = useReturnSingleCategory()

  const {
    mutateAsync: getProduct,
    data: productData,
    isPending: isGettingProducts
  } = useReturnSingleProduct()

  const [formData, setFormData] = useState<ReturnedProductType>({
    category: '',
    productId: '',
    size: '',
    design: '',
    color: ''
  })

  useEffect(() => {
    if (formData.category) {
      getCategory({
        id: formData.category
      }).catch((error) => toastUI.error(getError(error)))
    }

    if (formData.productId) {
      getProduct({ productId: formData.productId }).catch((error) => toastUI.error(getError(error)))
    }
  }, [formData.category, formData.productId])

  const onSubmit = () => {}

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
    const { hasSize, hasSubProducts, hasColor, hasDesign } = categoryData!

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

  return (
    <div>
      {formSteps === 1 && (
        <SelectCategory formData={formData} setFormData={setFormData} nextStep={fnSetFormStep} />
      )}

      {formSteps === 2 && (
        <SelectModel
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
        />
      )}

      {/* sizes */}
      {formSteps === 3 && (
        <SelectSize
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          productData={productData!}
          isLoading={isGettingProducts || isgettingCategory}
        />
      )}

      {/* Subproduct */}
      {formSteps === 4 && (
        <SelectSubProduct
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          productData={productData!}
          isLoading={isGettingProducts || isgettingCategory}
        />
      )}

      {/* Color */}
      {formSteps === 5 && (
        <SelectColor
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          productData={productData!}
          isLoading={isGettingProducts || isgettingCategory}
        />
      )}

      {/* Design */}
      {formSteps === 6 && (
        <SelectDesign
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
          productData={productData!}
          isLoading={isGettingProducts || isgettingCategory}
        />
      )}

      {/* summary */}
      {formSteps === 7 && (
        <SelectModel
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
        />
      )}
    </div>
  )
}

export default ReturnProductForm
