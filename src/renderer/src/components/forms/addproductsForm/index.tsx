import { useCreateProduct } from '@renderer/apis/products/createProduct'
import { toastUI } from '@renderer/components/ui/toast'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Entercolours from './Entercolours'
import EnterDesign from './EnterDesign'
import EnterModel from './EnterModel'
import EnterQuantity from './EnterQuantity'
import EnterSubproducts from './EnterSubproducts'
import { SelectCategory } from './selectCategory'
import SelectSubcategory from './SelectSubcategory'
import './styles.scss'
import Summary from './summary'

const AddProductForm = ({
  actionType,
  setOpenActionType
}: {
  actionType: string
  setOpenActionType: (value: boolean) => void
}) => {
  const [formSteps, setFormSteps] = useState(1)
  const navigate = useNavigate()

  const initialValues = {
    category: '',
    actionType: '',
    subcategory: '',
    categoryData: undefined,
    model: '',
    subProducts: [],
    totalAvailableProduct: 0,
    cartoonsPerSet: 1,
    colours: [],
    designs: []
  }

  const [defaultValues, setDefaultValues] = useState<AddProductDefaultValueTypes>({
    ...initialValues
  })

  useEffect(() => {
    if (actionType === '') {
      setOpenActionType(true)
    }

    defaultValues.actionType =
      actionType === 'new' ? 'new' : actionType === 'update' ? 'update' : ''

    setDefaultValues({ ...defaultValues })
  }, [actionType])

  const { isPending: creatingProduct, mutateAsync: createProduct } = useCreateProduct()

  // fn:Go to next form
  const fnSetFormStep = async () => {
    const { categoryData } = defaultValues
    if (formSteps === 1)
      return categoryData?.hasSubcategories
        ? setFormSteps(2)
        : categoryData?.hasModel
          ? setFormSteps(3)
          : setFormSteps(4)

    if (formSteps === 2) {
      return categoryData?.hasModel ? setFormSteps(3) : setFormSteps(4)
    }

    if (formSteps === 3) {
      return setFormSteps(4)
    }

    if (formSteps === 4) {
      return defaultValues.categoryData?.hasModel === false
        ? setFormSteps(8)
        : categoryData?.hasSubProducts && actionType === 'new'
          ? setFormSteps(5)
          : categoryData?.hasColor
            ? setFormSteps(6)
            : setFormSteps(8)
    }

    if (formSteps === 5) {
      return categoryData?.hasColor ? setFormSteps(6) : setFormSteps(8)
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
    const { categoryData } = defaultValues

    const { hasSubcategories, hasModel, hasSubProducts, hasColor } = categoryData!

    if (formSteps === 2) return setFormSteps(1)

    if (formSteps === 3) return hasSubcategories ? setFormSteps(2) : setFormSteps(1)

    if (formSteps === 4)
      return defaultValues.categoryData?.hasModel === false
        ? setFormSteps(1)
        : hasModel
          ? setFormSteps(3)
          : hasSubcategories
            ? setFormSteps(2)
            : setFormSteps(1)

    if (formSteps === 5) {
      return setFormSteps(4)
    }

    if (formSteps === 6) {
      return hasSubProducts && actionType === 'new' ? setFormSteps(5) : setFormSteps(4)
    }

    if (formSteps === 7) {
      return setFormSteps(6)
    }

    if (formSteps === 8) {
      return defaultValues.categoryData?.hasModel === false
        ? setFormSteps(4)
        : hasColor
          ? setFormSteps(7)
          : hasSubProducts
            ? setFormSteps(5)
            : setFormSteps(4)
    }
  }

  const onSubmit = async () => {
    const {
      id: categoryId,
      name: categoryName,
      hasModel,
      hasColor,
      hasSubProducts,
      hasSubcategories
    } = defaultValues.categoryData!

    // if creating new product
    createProduct({
      categoryId: categoryId,
      categoryName: categoryName,
      hasModel: hasModel,
      hasColors: hasColor,
      hasSubProducts: hasSubProducts,
      hasSubCategory: hasSubcategories,
      totalQuantity: defaultValues.totalAvailableProduct,
      cartoonsPerSet: defaultValues.cartoonsPerSet,
      subProducts: defaultValues.subProducts,
      subCategory: defaultValues.subcategory,
      colors: defaultValues.colours,
      designs: defaultValues.designs,
      actionType: defaultValues.actionType,
      model: defaultValues.model,
      productId: defaultValues.model
    })
      .then(() => {
        toastUI.success(
          actionType === 'new' ? 'Product added successfully' : 'Product updated successfully'
        )
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
      <div className="add_product_form">
        {/* select category */}
        {formSteps === 1 && (
          <SelectCategory
            setDefaultValues={setDefaultValues}
            defaultValues={defaultValues}
            nextformFn={fnSetFormStep}
            setFormSteps={setFormSteps}
          />
        )}

        {/* selectSubcategory  */}
        {formSteps === 2 && (
          <SelectSubcategory
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.subcategory = formData.subcategory
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            // @ts-ignore:undefined
            categoryData={defaultValues.categoryData}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter model */}
        {formSteps === 3 && (
          <EnterModel
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.model = formData.model
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
            setDefaultValues={setDefaultValues}
          />
        )}

        {/* Enter quantity */}
        {formSteps === 4 && (
          <EnterQuantity
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.totalAvailableProduct = formData.totalAvailableProduct
              defaultValues.cartoonsPerSet = formData.cartoonsPerSet
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter subproducts */}
        {formSteps === 5 && (
          <EnterSubproducts
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.subProducts = formData.subProducts.filter((i) => i.available == true)
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter colors */}
        {formSteps === 6 && (
          <Entercolours
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              console.log(defaultValues.designs)
              defaultValues.colours = formData.colours.filter((i) => i.availableQuantity > 0)

              setDefaultValues({ ...defaultValues })

              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter design */}
        {formSteps === 7 && (
          <EnterDesign
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.designs = formData.designs.map((i) => {
                i.designs = i.designs.filter((design) => Number(design.availableQuantity) > 0)

                return i
              })
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter design */}
        {formSteps === 8 && (
          <Summary
            defaultValues={defaultValues}
            isLoading={creatingProduct}
            handleProceed={() => {
              onSubmit()
            }}
            previousFormFn={goToPrevForm}
          />
        )}
      </div>
    </>
  )
}

export default AddProductForm
