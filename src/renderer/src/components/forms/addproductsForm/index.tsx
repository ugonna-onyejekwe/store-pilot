import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useCreateProduct } from '@renderer/apis/products/createProduct'
import { useEditProduct } from '@renderer/apis/products/editProduct'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { FormLoader } from '@renderer/components/ui/loader'
import { toastUI } from '@renderer/components/ui/toast'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ColorInput } from './ColorInput'
import { DesignInput } from './designInput'
import { EnterModal } from './EnterModal'
import { SelectCategory } from './selectCategory'
import { SizeInput } from './SizesInput'
import './styles.scss'
import SubProductForm from './SubProductForm'
import { Summary } from './summary'

type AddProductFormProps = {
  gettingSingleProduct: boolean
  productData: ProductResponse
}

const AddProductForm = ({ productData }: AddProductFormProps) => {
  const { actionType, productId, categoryId } = useParams()
  const editing = actionType && actionType === 'edit' ? true : false
  const [formSteps, setFormSteps] = useState(1)
  const { isPending: creatingProduct, mutateAsync: createProduct } = useCreateProduct()
  const {
    mutateAsync: getCategoryData,
    data: categoryData,
    isPending: isLoadingCategoryData
  } = useReturnSingleCategory()
  const { isPending: editingProduct, mutateAsync: editProduct } = useEditProduct()

  const navigate = useNavigate()

  const initialValues = {
    category: editing && productData ? productData?.category?.id : '',
    model: editing && productData ? productData.model : '',
    sizes: editing && productData ? productData.sizes : [],
    subProducts: editing && productData ? productData.subProducts : [],
    cartoonQuantity: editing && productData ? productData.cartoonsPerProduct : 1,
    colors: editing && productData ? productData.colors : [],
    designs: editing && productData ? productData.designs : [],
    colorCustomInputsIndex: [],
    designCustomInputsIndex: [],
    sizesCustomInputsIndex: [],
    totalQuantity: editing && productData ? productData.totalQuantity : 0,
    lastPrice: editing && productData ? productData.lastPrice : 0
  }

  const [defaultValues, setDefaultValues] = useState<AddProductDefaultValueTypes>({
    ...initialValues
  })

  useEffect(() => {
    if (editing) {
      getCategoryData({ id: categoryId! })
        .then(() => {
          fnSetFormStep()
        })
        .catch(() => {
          toastUI.error('Category not found')
          navigate('/admin')
        })
    }
  }, [editing, productId, categoryId])

  // initial default values
  useEffect(() => {
    if (!editing) {
      // setting Default values start======================
      // SIZES
      const formatedSizes = categoryData?.formatedListOfSizes
        .split(',')
        .filter(Boolean)
        .map((i) => ({
          name: i,
          quantity: 0
        }))

      // SUBPRODUCTS
      const formatedSubProducts = categoryData?.formatedListOfSubproducts.map((i) => ({
        ...i,
        available: true
      }))

      // COLORS
      const formatedColors = categoryData?.formatedListOfColors
        .split(',')
        .filter(Boolean)
        .map((i) => ({
          name: i,
          quantity: 0
        }))

      // DESIGNS
      const formatedDesigns = categoryData?.formatedListOfDesigns
        .split(',')
        .filter(Boolean)
        .map((i) => ({
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
    }
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

  const onSubmit = async () => {
    const {
      category,
      model,
      sizes,
      subProducts,
      cartoonQuantity,
      colors,
      designs,
      totalQuantity,
      lastPrice
    } = defaultValues

    // if editing product
    if (editing) {
      editProduct({
        productId: productData.productId,
        model,
        totalQuantity,
        cartoonsPerProduct: cartoonQuantity,
        sizes,
        subProducts,
        colors,
        designs,
        categoryId: productData.category.id,
        lastPrice
      })
        .then(() => {
          toastUI.success('Product updated successfully')
          navigate('/admin')
          setFormSteps(1)
          setDefaultValues({ ...initialValues })
        })
        .catch((error) => console.log(error))

      return
    }

    // if creating new product
    createProduct({
      categoryId: category,
      model,
      totalQuantity,
      cartoonsPerProduct: cartoonQuantity,
      sizes,
      subProducts,
      colors,
      designs,
      lastPrice
    })
      .then(() => {
        toastUI.success('Product add successfully')
        navigate('/admin')
        setFormSteps(1)
        setDefaultValues({ ...initialValues })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {editing && isLoadingCategoryData ? (
        <FormLoader />
      ) : (
        <div>
          {formSteps === 1 && (
            <SelectCategory
              defaultValues={defaultValues}
              isLoading={isLoadingCategoryData}
              data={categoryData!}
              handleProceed={(formData) => {
                setDefaultValues({ ...defaultValues, category: formData.category })
                getCategoryData({ id: formData.category })
                  .then(async () => {
                    fnSetFormStep()
                  })
                  .catch(() => {
                    toastUI.error('Product category not found')
                    setFormSteps(1)

                    if (editing) navigate('/admin')
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
                  totalQuantity: formData.totalQuantity,
                  lastPrice: formData.lastPrice
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
                onSubmit()
              }}
              backFn={goToPrevForm}
              categoryData={categoryData!}
              isLoading={editing ? editingProduct : creatingProduct}
              setDefaultValues={setDefaultValues}
            />
          )}
        </div>
      )}
    </>
  )
}

export default AddProductForm
