import { useGetCategories } from '@renderer/apis/categories/getCategories'
import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { useReturnAllProducts } from '@renderer/apis/products/getProducts'
import { ProductResponse, useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import Button from '@renderer/components/ui/Button'
import { Input, SelecInput } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import {
  getColorsOptions,
  getDesignOptions,
  getQuantityLeftInColours,
  getQuantityLeftInDesigns,
  getQuantityLeftInModels
} from '@renderer/lib/hooks'
import { RootState } from '@renderer/store'
import { addTocart } from '@renderer/store/cartSlice'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sellGoodsSchema } from './schema'
import './styles.scss'

const OutGoingGoodsForm = ({
  openModel,
  selectedProductData
}: {
  openModel: (value: boolean) => void
  selectedProductData?: ProductResponse
}) => {
  const [data, setData] = useState<DataType>({
    listOfDesigns: [],
    listOfColours: [],
    colorQuantityMsg: '',
    designQuantityMsg: '',
    modelQuantityMsg: ''
  })
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)

  const initialValues: sellGoodsModelInitailValueType = {
    categoryId: selectedProductData?.categoryId ?? '',
    subcategory: selectedProductData?.subCategory ?? '',
    model: selectedProductData?.model ?? '',
    productId: selectedProductData?.productId ?? '',
    sellType: 'all',
    subproducts: [],
    color: '',
    design: '',
    quantity: 1,
    hasSubCategory: selectedProductData?.hasSubCategory ?? false,
    hasModel: selectedProductData?.hasModel ?? false,
    hasColor: selectedProductData?.hasColors ?? false,
    hasSubProducts: selectedProductData?.hasSubProducts ?? false,
    cartoonQuantity: 1,
    hasDesign: selectedProductData?.hasDesigns ?? false
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
  const onSubmit = (values: sellGoodsModelInitailValueType) => {
    const product = selectedProductData ?? productData

    if (values.hasSubProducts === false) setFieldValue('sellType', 'all')

    // Quantity check for product without model
    if (Number(values.quantity) > Number(product?.totalQuantity)) {
      toastUI.error(`There is only ${product?.totalQuantity} of this product left`)

      return
    }

    // colour  quantity check
    if (
      categoryData?.hasColor &&
      Number(values.quantity) >
        Number(getQuantityLeftInColours(product!, values.color).quantityLeft)
    ) {
      toastUI.error(
        `There is only ${getQuantityLeftInColours(product!, values.color).quantityLeft} of this colour left`
      )

      return
    }

    // design  quantity check
    if (
      categoryData?.hasColor &&
      Number(values.quantity) >
        Number(getQuantityLeftInDesigns(product!, values.color, values.design).quantityLeft)
    ) {
      toastUI.error(
        `There is only ${getQuantityLeftInDesigns(product!, values.color, values.design).quantityLeft} of this design left`
      )

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

      dispatch(
        addTocart({
          categoryId: values.categoryId,
          subcategory: values.subcategory,
          model: values.model,
          productId: values.productId,
          subproducts: values.subproducts,
          color: values.color,
          design: values.design,
          quantity: values.quantity,
          cartoonQuantity: values.cartoonQuantity,
          sellType: values.sellType
        })
      )

      toastUI.success('Product added to cart')
      openModel(false)

      return
    }

    dispatch(
      addTocart({
        categoryId: values.categoryId,
        subcategory: values.subcategory,
        model: values.model,
        productId: values.productId,
        subproducts: values.subproducts,
        color: values.color,
        design: values.design,
        quantity: values.quantity,
        cartoonQuantity:
          values.sellType === 'all' ? (product?.cartoonsPerSet ?? 1) : values.cartoonQuantity,
        sellType: values.sellType
      })
    )

    toastUI.success('Product added to cart')
    openModel(false)
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

    if (selectedProductData) return

    const init = async () => {
      if (categoryData) {
        await setFieldValue('hasSubCategory', categoryData?.hasSubcategories)
        await setFieldValue('hasModel', categoryData?.hasModel)
        await setFieldValue('hasColor', categoryData?.hasColor)
        await setFieldValue('hasSubProducts', categoryData?.hasSubProducts)
        await setFieldValue('hasDesign', categoryData?.hasDesign)
      }
    }

    init()
  }, [categoryData])

  // useEffect to get all products
  useEffect(() => {
    if (selectedProductData) return

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
    if (selectedProductData) return

    if (values.productId) {
      getProduct({ productId: values.productId })
    }
  }, [values.productId])

  // useEffect to get sub category
  useEffect(() => {
    const init = async () => {
      let listOfSubProducts

      if (categoryData && categoryData.hasSubcategories && values.subcategory) {
        listOfSubProducts = categoryData.subProducts
          .find((i) => i.subCategoryName === values.subcategory)
          ?.subProducts?.map((i) => ({ ...i, sellQuantity: i.defaultQuantity }))
      }

      if (categoryData && categoryData.hasSubcategories === false) {
        listOfSubProducts = categoryData.subProducts.map((i) => ({
          ...i,
          sellQuantity: i.defaultQuantity
        }))
      }

      await setFieldValue('subproducts', listOfSubProducts ?? [])
    }

    init()
  }, [values.subcategory, values.categoryId, categoryData])

  // reset quantity to sell
  useEffect(() => {
    if (values.sellType === 'sell part') {
      setFieldValue('quantity', 1)
    }
  }, [values.sellType])

  // anytime there is a chnage in colour:Automatically set design to null to the user to select the proper design
  useEffect(() => {
    setFieldValue('design', '')
  }, [values.color])

  useEffect(() => {
    const product = selectedProductData ?? productData

    if (!product) {
      setData({
        ...data,
        listOfDesigns: [],
        listOfColours: [],
        colorQuantityMsg: '',
        designQuantityMsg: '',
        modelQuantityMsg: ''
      })
    }

    if (product) {
      setData({
        ...data,
        listOfDesigns: getDesignOptions(product!, values.color),
        listOfColours: getColorsOptions(product!),
        colorQuantityMsg: getQuantityLeftInColours(product, values.color, cartItems).msg,
        designQuantityMsg: getQuantityLeftInDesigns(product, values.color, values.design, cartItems)
          .msg,
        modelQuantityMsg: getQuantityLeftInModels(product, cartItems).msg
      })
    }
  }, [productData, values.model, values.design, values.color, selectedProductData])

  return (
    <div className="out_going_goods_form">
      <form onSubmit={handleSubmit}>
        <div className="form_con">
          <>
            {selectedProductData ? (
              <Input
                disabled
                label="Select product category"
                value={selectedProductData.categoryName}
                onChange={() => {}}
                placeholder=""
              />
            ) : (
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
            )}

            {values?.hasSubCategory && (
              <>
                {selectedProductData ? (
                  <Input
                    disabled
                    label="Select product sub-category"
                    value={selectedProductData.subCategory}
                    onChange={() => {}}
                    placeholder=""
                  />
                ) : (
                  <SelecInput
                    label="Select product sub-category"
                    placeholder="Select..."
                    id="subcategory"
                    name="subcategory"
                    onChange={setFieldValue}
                    isLoading={isgettingSingleCategory}
                    options={
                      categoryData?.subcategories.map((i) => ({ label: i.name, value: i.name })) ??
                      []
                    }
                    errorMsg={errors.subcategory}
                    touched={touched.subcategory}
                    defaultValue={values.subcategory}
                  />
                )}
              </>
            )}

            {values?.hasModel && (
              <div>
                {selectedProductData ? (
                  <Input
                    disabled
                    label="Select product model"
                    value={selectedProductData.model}
                    onChange={() => {}}
                    placeholder=""
                  />
                ) : (
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
                )}

                {values.productId && (
                  <small className="input_info_txt">{data.modelQuantityMsg}</small>
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
                    options={data.listOfColours}
                    id="color"
                    name="color"
                    onChange={setFieldValue}
                    errorMsg={errors.color}
                    touched={touched.color}
                    defaultValue={values.color}
                  />

                  {values.color && (
                    <small className="input_info_txt">{data.colorQuantityMsg}</small>
                  )}
                </div>
              )}

              {values?.hasDesign && (
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
                    <small className="input_info_txt">{data.designQuantityMsg}</small>
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
                    {productData
                      ? productData?.cartoonsPerSet * values.quantity
                      : selectedProductData
                        ? selectedProductData?.cartoonsPerSet * values.quantity
                        : '__'}{' '}
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
          <Button text="Add To Cart" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default OutGoingGoodsForm
