import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { Input, SelecInput } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import CheckoutForm from './checkoutForm'
import { sellGoodsSchema } from './schema'
import './styles.scss'

type DataType = {
  listOfDesigns: { label: string; value: string }[]
  colorQuantity: number | null
  designQuantity: number | null
}

const OutGoingGoodsForm = ({ openModel }: { openModel: (value: boolean) => void }) => {
  const [data, setData] = useState<DataType>({
    listOfDesigns: [],
    colorQuantity: null,
    designQuantity: null
  })

  const [successMsgData, setSuccessMsgData] = useState({
    customerName: '',
    cartoonNumber: 0
  })

  const [openSuccessCon, setOpenSuccessCon] = useState(false)

  const [formStep, setFormStep] = useState(1)

  const initialValues: sellGoodsModelInitailValueType = {
    categoryId: '',
    subcategory: '',
    model: '',
    productId: '',
    sellType: 'all',
    subproducts: [],
    color: '',
    design: '',
    quantity: 1,
    hasSubCategory: false,
    hasModel: false,
    hasColor: false,
    hasSubProducts: false,
    cartoonQuantity: 1
  }

  //   get all categories
  const { CategoriesData, isPending: isGettingcategoryList } = useGetCategories()

  //   get single category
  const {
    isPending: isgettingSingleCategory,
    data: categoryData,
    mutateAsync: getSingleCategory
  } = useReturnSingleCategory()

  // get all products
  const {
    mutate: getProducts,
    isPending: isGettingProducts,
    data: productList
  } = useReturnAllProducts()

  // get single product
  const {
    isPending: isGettingProduct,
    mutate: getProduct,
    data: productData
  } = useReturnSingleProduct()

  // Onsubmit fn
  const onSubmit = () => {
    if (values.hasSubProducts === false) setFieldValue('sellType', 'all')

    // Quantity check for product without model
    if (
      categoryData?.hasModel === false &&
      Number(values.quantity) > Number(productData?.totalQuantity)
    ) {
      toastUI.error(`There is only ${productData?.totalQuantity} of this product left`)

      return
    }

    // quantity check
    if (categoryData?.hasColor && Number(values.quantity) > Number(productData?.totalQuantity)) {
      toastUI.error(`There is only ${productData?.totalQuantity} of this product left`)
      return
    }

    // colour  quantity check
    if (categoryData?.hasColor && Number(values.quantity) > Number(data.colorQuantity)) {
      toastUI.error(`There is only ${data?.colorQuantity} of this colour left`)

      return
    }

    // design  quantity check
    if (categoryData?.hasColor && Number(values.quantity) > Number(data.designQuantity)) {
      toastUI.error(`There is only ${data?.designQuantity} of this design left`)

      return
    }

    if (values.sellType === 'sell part' && categoryData?.hasSubProducts) {
      const cummulative = values.subproducts.reduce(
        (quamtity, product) => Number(product.sellQuantity) + quamtity,
        0
      )

      if (cummulative === 0) {
        toastUI.error('No sub product was selected')

        return
      }

      setFormStep(2)

      return
    }

    setFormStep(2)
  }

  // initailizing formik
  const { setFieldValue, values, errors, touched, handleSubmit, handleChange, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: sellGoodsSchema,
      onSubmit
    })

  // useEffect to fetch categoryData
  useEffect(() => {
    if (values.categoryId) {
      getSingleCategory({ id: values.categoryId })
    }
  }, [values.categoryId])

  // use effect to fetch product details if product does not have model
  useEffect(() => {
    if (categoryData && categoryData?.hasModel === false) {
      setFieldValue('productId', values.categoryId)
    }

    const init = async () => {
      if (categoryData) {
        await setFieldValue('hasSubCategory', categoryData?.hasSubcategories)
        await setFieldValue('hasModel', categoryData?.hasModel)
        await setFieldValue('hasColor', categoryData?.hasColor)
        await setFieldValue('hasSubProducts', categoryData?.hasSubProducts)
      }
    }

    init()
  }, [categoryData])

  // useEffect to get all products
  useEffect(() => {
    if (values.categoryId || values.subcategory) {
      getProducts({
        subCategoryName: values.subcategory,
        categoryId: values.categoryId
      })
    }
  }, [values.categoryId, values.subcategory])

  // useEffect to check if products exist
  useEffect(() => {
    if (productList && values.categoryId && categoryData?.hasModel) {
      productList.length === 0 && toastUI.error('There is no product under this category')
      return
    }
  }, [productList, values.categoryId])

  // useEffect to get single product
  useEffect(() => {
    if (values.productId) {
      getProduct({ productId: values.productId })
    }
  }, [values.productId])

  // useEffect to set list of designs
  useEffect(() => {
    if (values.color) {
      const designsCon = productData?.designs.find((i) => i.colorName === values.color)

      console.log(designsCon)

      const formatedList = designsCon?.designs.map((i) => ({ label: i.name, value: i.name }))

      data.listOfDesigns = formatedList!

      setData({ ...data })
    }
  }, [values.color])

  // useEffect to get sub category
  useEffect(() => {
    const init = async () => {
      let listOfSubProducts

      if (categoryData && categoryData.hasSubCategory && values.subcategory) {
        listOfSubProducts = categoryData.subProducts
          .find((i) => i.subCategoryName === values.subcategory)
          ?.subProducts?.map((i) => ({ ...i, sellQuantity: i.defaultQuantity }))
      }

      if (categoryData && categoryData.hasSubCategory === false) {
        listOfSubProducts = categoryData.subProducts.map((i) => ({
          ...i,
          sellQuantity: i.defaultQuantity
        }))
      }

      await setFieldValue('subproducts', listOfSubProducts ?? [])
    }

    init()
  }, [values.subcategory, values.categoryId, categoryData])

  // useEffect to get color quantity
  useEffect(() => {
    if (categoryData?.hasColors && values.color) {
      const color = productData?.colors.find((i) => i.name === values.color)

      data.colorQuantity = color?.availableQuantity ?? 0

      setData({ ...data })
    }

    if (categoryData?.hasColors && values.design) {
      const designArr = productData?.designs.find((i) => i.colorName === values.color)

      const design = designArr?.designs?.find((i) => i.name === values.design)

      data.designQuantity = design?.availableQuantity ?? 0

      setData({ ...data })
    }
  }, [productData, values.color, values.design])

  // reset quantity to sell
  useEffect(() => {
    if (values.sellType === 'sell part') {
      setFieldValue('quantity', 1)
    }
  }, [values.sellType])

  return (
    <div className="out_going_goods_form">
      {formStep === 1 && (
        <form onSubmit={handleSubmit}>
          <div className="form_con">
            <>
              <SelecInput
                label="Select product category"
                placeholder="Select.."
                id="categoryId"
                name="categoryId"
                onChange={setFieldValue}
                options={CategoriesData ?? []}
                isLoading={isGettingcategoryList}
                errorMsg={errors.categoryId}
                touched={touched.categoryId}
              />

              {values?.hasSubCategory && (
                <SelecInput
                  label="Select product sub-category"
                  placeholder="Select..."
                  id="subcategory"
                  name="subcategory"
                  onChange={setFieldValue}
                  isLoading={isgettingSingleCategory}
                  options={
                    categoryData?.subcategories.map((i) => ({ label: i.name, value: i.name })) ?? []
                  }
                  errorMsg={errors.subcategory}
                  touched={touched.subcategory}
                  defaultValue={values.subcategory}
                />
              )}

              {values?.hasModel && (
                <div>
                  <SelecInput
                    label="Select product model"
                    placeholder="Select.."
                    id="productId"
                    name="productId"
                    onChange={setFieldValue}
                    // @ts-expect-error: undefined value
                    options={productList?.map((i) => ({ value: i.productId, label: i.model }))}
                    isLoading={isGettingProducts}
                    errorMsg={errors.productId}
                    touched={touched.productId}
                  />
                  {values.productId && (
                    <small className="input_info_txt">
                      This model has {productData?.totalQuantity ?? '__'} left
                    </small>
                  )}
                </div>
              )}

              <div className="input_row_con">
                {values?.hasColor && (
                  <div
                    style={{
                      flex: 1
                    }}
                  >
                    <SelecInput
                      label="Select  colour "
                      placeholder="Select ..."
                      isLoading={isGettingProduct}
                      options={
                        productData?.colors.map((i) => ({ label: i.name, value: i.name })) ?? []
                      }
                      id="color"
                      name="color"
                      onChange={setFieldValue}
                      errorMsg={errors.color}
                      touched={touched.color}
                      defaultValue={values.color}
                    />

                    {values.color && (
                      <small className="input_info_txt">
                        This colour has {data.colorQuantity ?? '__'} left
                      </small>
                    )}
                  </div>
                )}

                {values?.hasColor && (
                  <div
                    style={{
                      flex: 1
                    }}
                  >
                    <SelecInput
                      label="Select  design"
                      placeholder="Select ..."
                      options={data.listOfDesigns}
                      id="design"
                      name="design"
                      isLoading={isGettingProduct}
                      onChange={setFieldValue}
                      errorMsg={errors.design}
                      touched={touched.design}
                    />

                    {values.design && (
                      <small className="input_info_txt">
                        This design has {data.designQuantity ?? '__'} left
                      </small>
                    )}
                  </div>
                )}
              </div>

              {values.subproducts?.length !== 0 && (
                <>
                  {values?.hasModel && values.hasSubProducts && (
                    <SelecInput
                      label="Do you want to sell all or part of the sub-product(s)?"
                      placeholder="Select option"
                      onChange={setFieldValue}
                      options={[
                        { value: 'all', label: 'Sell All' },
                        { value: 'part', label: 'Sell Part' }
                      ]}
                      id="sellType"
                      name="sellType"
                      errorMsg={errors.sellType}
                      touched={touched.sellType}
                    />
                  )}

                  {values?.hasSubProducts && values.sellType === 'part' && (
                    <div className="sub_products_con">
                      <h3>Enter quantity of sub-products</h3>

                      <div className="box_con">
                        {values.subproducts.map((i, key) => (
                          <div className="con" key={key}>
                            <Input
                              label={i.name}
                              onChange={async (e) => {
                                values.subproducts[key].sellQuantity = e.target.value

                                await setFieldValue('subproducts', values.subproducts)
                                // setData({ ...data })
                              }}
                              placeholder="Enter quantity..."
                              value={i.sellQuantity}
                              onBlur={async (e) => {
                                const value = e.target.value

                                if (value < 0) {
                                  values.subproducts[key].sellQuantity = 0

                                  await setFieldValue('subproducts', values.subproducts)

                                  toastUI.error("Value can't be less than 0")
                                }
                                if (value > i.defaultQuantity) {
                                  values.subproducts[key].sellQuantity = i.defaultQuantity

                                  await setFieldValue('subproducts', values.subproducts)

                                  toastUI.error(`${i.name} is only ${i.defaultQuantity}`)
                                }
                              }}
                              type="number"
                            />

                            <small>{i.defaultQuantity}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {values.categoryId !== '' && values.sellType !== 'part' && (
                <div>
                  <Input
                    label="Enter product quantity"
                    placeholder="Enter quantity..."
                    value={values.quantity}
                    onChange={handleChange('quantity')}
                    type="number"
                    errorMsg={errors.quantity}
                    touched={touched.quantity}
                    onBlur={(e) => {
                      const value = e.target.value
                      if (value < 1) {
                        toastUI.error("Quantity can't be less than 1")
                        setFieldValue('quantity', 1)
                      }
                    }}
                  />
                  {values.quantity > 0 && (
                    <small className="input_info_txt">
                      {(productData && productData?.cartoonsPerSet * values.quantity) ?? '__'}{' '}
                      cartoon(s) to be supplied
                    </small>
                  )}
                </div>
              )}

              {values.categoryId !== '' && values.sellType === 'part' && (
                <Input
                  label="How many cartoons do you think would be left?"
                  placeholder="Enter quantity..."
                  value={values.cartoonQuantity}
                  onChange={handleChange('quantity')}
                  onBlur={(e) => {
                    if (e.target.value < 1) {
                      setFieldValue('cartoonQuantity', 1)
                    }
                  }}
                  type="number"
                />
              )}
            </>
          </div>

          <div className="btns">
            <Button
              text={'Cancel'}
              onClick={() => {
                openModel(false)
                resetForm()
              }}
              varient="outline"
              type="button"
            />
            <Button text="Proceed" type="submit" onClick={() => console.log(errors)} />
          </div>
        </form>
      )}

      {formStep === 2 && (
        <>
          <CheckoutForm
            setFormStep={setFormStep}
            productData={values}
            openSuccessMsg={(customerName: string) => {
              setFormStep(3)
              setOpenSuccessCon(true)
              setSuccessMsgData({
                ...successMsgData,
                customerName,
                cartoonNumber: Number(values.quantity) * Number(productData?.cartoonsPerSet)
              })
            }}
          />
        </>
      )}

      {formStep === 3 && (
        <SuccessMsg
          customerData={successMsgData}
          isOpen={openSuccessCon}
          setOpen={setOpenSuccessCon}
          openParentModal={openModel}
        />
      )}
    </div>
  )
}

export default OutGoingGoodsForm

const SuccessMsg = ({
  customerData,
  isOpen,
  setOpen,
  openParentModal
}: {
  customerData: { customerName: string; cartoonNumber: number }
  isOpen: boolean
  setOpen: (value: boolean) => void
  openParentModal: (value: boolean) => void
}) => {
  return (
    <AlertModal className="successMsg" open={isOpen} onOpenChange={setOpen} isCloseable={false}>
      <div className="success_icon">
        <Icons.CheckIcon className="icon" />
      </div>
      <h2>Checkout successful</h2>

      <p>Approximately</p>

      <h1>
        {customerData.cartoonNumber} <span>cartoon(s)</span>
      </h1>

      <p>
        Will be supplied to <b>{customerData.customerName}</b>
      </p>

      <div className="btn">
        <Button text="Save" onClick={() => openParentModal(false)} />
      </div>
    </AlertModal>
  )
}
