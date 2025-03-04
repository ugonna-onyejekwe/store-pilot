import { useCreateProduct } from '@renderer/apis/products/createProduct'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import Addproduct__ActionModal from '@renderer/components/forms/addproductsForm/Addproduct__ActionModal'
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
import Summary from './Summary'

type AddProductFormProps = {
  gettingSingleProduct: boolean
  productData: ProductResponse
}

const AddProductForm = ({ productData }: AddProductFormProps) => {
  const [formSteps, setFormSteps] = useState(1)
  const [openActionTypeModal, setOpenActionTypeModal] = useState(true)
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

  const { isPending: creatingProduct, mutateAsync: createProduct } = useCreateProduct()

  useEffect(() => {
    if (defaultValues.actionType === '') setOpenActionTypeModal(true)
  }, [defaultValues.actionType])

  // fn:Go to next form
  const fnSetFormStep = async () => {
    const { categoryData } = defaultValues
    if (formSteps === 1)
      return categoryData?.hasSubcategories
        ? setFormSteps(2)
        : categoryData?.hasModel
          ? setFormSteps(3)
          : categoryData?.hasSubProducts
            ? setFormSteps(4)
            : categoryData?.hasColor
              ? setFormSteps(5)
              : setFormSteps(7)

    if (formSteps === 2) {
      return categoryData?.hasModel
        ? setFormSteps(3)
        : categoryData?.hasSubProducts
          ? setFormSteps(4)
          : categoryData?.hasColor
            ? setFormSteps(5)
            : setFormSteps(7)
    }

    if (formSteps === 3) {
      return categoryData?.hasSubProducts
        ? setFormSteps(4)
        : categoryData?.hasColor
          ? setFormSteps(5)
          : setFormSteps(7)
    }

    if (formSteps === 4) {
      return categoryData?.hasColor ? setFormSteps(5) : setFormSteps(7)
    }

    if (formSteps === 5) {
      return setFormSteps(6)
    }

    if (formSteps === 6) {
      return setFormSteps(7)
    }
  }

  //fn: Go back to previous form
  const goToPrevForm = () => {
    const { categoryData } = defaultValues

    const { hasSubcategories, hasModel, hasSubProducts, hasColor } = categoryData!

    if (formSteps === 2) return setFormSteps(1)

    if (formSteps === 3) return hasSubcategories ? setFormSteps(2) : setFormSteps(1)

    if (formSteps === 4)
      return hasModel ? setFormSteps(3) : hasSubcategories ? setFormSteps(2) : setFormSteps(1)

    if (formSteps === 5) {
      return hasSubProducts
        ? setFormSteps(4)
        : hasModel
          ? setFormSteps(3)
          : hasSubcategories
            ? setFormSteps(2)
            : setFormSteps(1)
    }

    if (formSteps === 6) {
      return hasColor
        ? setFormSteps(5)
        : hasSubProducts
          ? setFormSteps(4)
          : hasModel
            ? setFormSteps(3)
            : hasSubcategories
              ? setFormSteps(2)
              : setFormSteps(1)
    }

    if (formSteps === 7) {
      return hasColor
        ? setFormSteps(6)
        : hasSubProducts
          ? setFormSteps(4)
          : hasModel
            ? setFormSteps(3)
            : hasSubcategories
              ? setFormSteps(2)
              : setFormSteps(1)
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
      model: defaultValues.model
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
      <div className="add_product_form">
        {/* select category */}
        {formSteps === 1 && (
          <SelectCategory
            setDefaultValues={setDefaultValues}
            defaultValues={defaultValues}
            nextformFn={fnSetFormStep}
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
            categoryData={defaultValues.categoryData!}
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
        {formSteps === 4 && (
          <EnterSubproducts
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.subProducts = formData.subProducts
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter colors */}
        {formSteps === 5 && (
          <Entercolours
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.colours = formData.colours
              setDefaultValues({ ...defaultValues })
              console.log(formData, 'hdjd', defaultValues.colours)

              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter design */}
        {formSteps === 6 && (
          <EnterDesign
            defaultValues={defaultValues}
            handleProceed={(formData) => {
              defaultValues.designs = formData.designs
              setDefaultValues({ ...defaultValues })
              fnSetFormStep()
            }}
            previousFormFn={goToPrevForm}
          />
        )}

        {/* enter design */}
        {formSteps === 7 && (
          <Summary
            defaultValues={defaultValues}
            handleProceed={() => {
              onSubmit()
            }}
            previousFormFn={goToPrevForm}
          />
        )}
      </div>

      {/* Modal for action type */}
      {openActionTypeModal && (
        <Addproduct__ActionModal
          open={openActionTypeModal}
          onOpenChange={setOpenActionTypeModal}
          handleSubmit={(formData) => {
            defaultValues.actionType = formData.actionType
            setDefaultValues({ ...defaultValues })
            setOpenActionTypeModal(false)
          }}
        />
      )}
    </>
  )
}

export default AddProductForm
