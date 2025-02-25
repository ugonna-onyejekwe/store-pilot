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
import { SubProductQuantities } from './enterSubProduct'
import { SelectReturnDisposition } from './productStatus'
import './styles.scss'
import { Summary } from './summary'

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
    color: '',
    subproducts: [],
    returnDisposition: '',
    quantity: 1
  })

  useEffect(() => {
    if (formData.productId) {
      getProduct({ productId: formData.productId }).catch((error) => toastUI.error(getError(error)))
    }
  }, [formData.category, formData.productId])

  useEffect(() => {
    if (categoryData?.hasSubProducts === true) {
      formData.subproducts =
        productData?.subProducts.map((i) => ({ ...i, inputedQuantity: 0 })) ?? []

      setFormData({ ...formData })
    }
  }, [productData, categoryData])

  const onSubmit = () => {}

  // fn:Go to next form
  const fnSetFormStep = () => {
    const { hasModel, hasSize, hasSubProducts, hasColor, hasDesign } = categoryData!

    if (formSteps === 1) return hasModel ? setFormSteps(2) : setFormSteps(7)

    if (formSteps === 2) {
      return hasSize
        ? setFormSteps(3)
        : hasSubProducts
          ? setFormSteps(4)
          : hasColor
            ? setFormSteps(5)
            : hasDesign
              ? setFormSteps(6)
              : setFormSteps(7)
    }

    if (formSteps === 3) {
      return hasSubProducts
        ? setFormSteps(4)
        : hasColor
          ? setFormSteps(5)
          : hasDesign
            ? setFormSteps(6)
            : setFormSteps(7)
    }

    if (formSteps === 4) {
      return hasColor ? setFormSteps(5) : hasDesign ? setFormSteps(6) : setFormSteps(7)
    }

    if (formSteps === 5) {
      return hasDesign ? setFormSteps(6) : setFormSteps(7)
    }

    if (formSteps === 6) {
      return setFormSteps(7)
    }

    if (formSteps === 7) {
      return setFormSteps(8)
    }
  }

  //fn: Go back to previous form
  const goToPrevForm = () => {
    const { hasModel, hasSize, hasSubProducts, hasColor, hasDesign } = categoryData!

    if (formSteps === 2) return setFormSteps(1)

    if (formSteps === 3) return hasModel ? setFormSteps(2) : setFormSteps(1)

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
      return !hasModel
        ? setFormSteps(1)
        : hasDesign
          ? setFormSteps(6)
          : hasColor
            ? setFormSteps(5)
            : hasSubProducts
              ? setFormSteps(4)
              : hasSize
                ? setFormSteps(3)
                : setFormSteps(2)
    }

    if (formSteps === 8) {
      setFormSteps(7)
    }
  }

  return (
    <div className="returnedGoodsForm">
      {formSteps === 1 && (
        <SelectCategory
          formData={formData}
          setFormData={setFormData}
          handleProceed={async (values) => {
            getCategory({
              id: values.category
            })
              .then(() => fnSetFormStep())
              .catch((error) => toastUI.error(getError(error)))
          }}
          isLoading={isgettingCategory}
        />
      )}

      {formSteps === 2 && (
        <SelectModel
          formData={formData}
          setFormData={setFormData}
          prevStep={goToPrevForm}
          handleProceed={async (values) => {
            getProduct({ productId: values.productId })
              .then(() => fnSetFormStep())
              .catch((error) => toastUI.error(getError(error)))
          }}
          isLoading={isGettingProducts}
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
        <SubProductQuantities
          formData={formData}
          setFormData={setFormData}
          nextStep={fnSetFormStep}
          prevStep={goToPrevForm}
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
          productData={productData!}
          categoryData={categoryData!}
        />
      )}
    </div>
  )
}

export default ReturnProductForm
