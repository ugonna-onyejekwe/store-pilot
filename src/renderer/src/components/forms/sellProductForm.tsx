import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { RootState } from '@renderer/store'
import { addTocart } from '@renderer/store/cartSlice'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, SelecInput } from '../inputs'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import { sellProductSchema } from './schemas'

type SellProductFormProps = {
  categoryData: SingleCategoryResponse
  productData: ProductResponse
  setOpenModel: (value: boolean) => void
}

const SellProductForm = ({ categoryData, productData, setOpenModel }: SellProductFormProps) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const [quantityInCart, setQuantityInCart] = useState(0)

  useEffect(() => {
    let quantity = 0
    cartItems.map((i) => {
      if (i.productId === productData.productId) {
        quantity += i.quantity
      }
    })
    setQuantityInCart(quantity)
  }, [cartItems])

  const [subproductsValues, setSubProductsValues] = useState<
    {
      name: string
      id: string
      available: boolean
      defaultQuantity: number
      left: number
      sellQuantity: number
    }[]
  >([])

  const [quantitiesLeft, setQuantitiesLeft] = useState({
    size: 0,
    color: 0,
    design: 0
  })

  const initialvalues = {
    category: productData ? productData.category.name : '',
    model: productData ? productData?.model : '',
    hasModel: categoryData ? categoryData?.hasModel : false,
    hasSize: categoryData?.hasSize ?? false,
    hasDesign: categoryData?.hasDesign ?? false,
    hasSubProducts: categoryData?.hasSubProducts ?? false,
    color: '',
    design: '',
    size: '',
    quantity: 1,
    typeOfSale: '',
    subproducts: [],
    cartoonQuantity:
      productData.cartoonsPerProduct - 1 === 0 ? 1 : productData.cartoonsPerProduct - 1
  }

  // Filter out avalibale quantities
  const availableSizes = productData.sizes.filter((i) => i.quantity > 0)
  const formatedSizeOptions = availableSizes.map((i) => ({ value: i.id, label: i.name }))

  const availableColors = productData.colors.filter((i) => i.quantity > 0)
  const formatedColorOptions = availableColors.map((i) => ({ value: i.id, label: i.name }))

  const availableDesigns = productData.designs.filter((i) => i.quantity > 0)
  const formatedDesignOptions = availableDesigns.map((i) => ({ value: i.id, label: i.name }))

  const onSubmit = async (values) => {
    if (productData.totalQuantity - quantityInCart < values.quantity)
      return toastUI.error(`Avaliable quantity is ${productData.totalQuantity - quantityInCart}`)

    dispatch(
      addTocart({
        category: productData.category,
        model: values.model,
        productId: productData.productId,
        size: values.size,
        design: values.design,
        quantity: values.quantity,
        typeOfSale: values.typeOfSale,
        subproducts: values.subproducts,
        color: values.color,
        leftOverId: ''
      })
    )
    toastUI.success('Product added to cart')
    resetForm()
    setOpenModel(false)
  }

  //Initailize formik
  const { values, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: sellProductSchema,
      onSubmit
    })

  // UseEffect to display qunatity left for a product
  useEffect(() => {
    const { color, size, design } = values

    const colorInfo = availableColors.find((i) => i.id === color)
    const sizeInfo = availableSizes.find((i) => i.id === size)
    const designInfo = availableDesigns.find((i) => i.id === design)

    setQuantitiesLeft({
      ...quantitiesLeft,
      color: colorInfo?.quantity ?? 0,
      design: designInfo?.quantity ?? 0,
      size: sizeInfo?.quantity ?? 0
    })
  }, [values])

  // To display subproduct inputs if the are to be sold
  useEffect(() => {
    if (values.typeOfSale !== '' && values.typeOfSale.toLowerCase().trim() === 'sell part') {
      const availableSubproduct = productData.subProducts.filter((i) => i.available === true)

      const formatedSubproduct = availableSubproduct.map((i) => ({
        ...i,
        sellQuantity: i.defaultQuantity
      }))

      setSubProductsValues(formatedSubproduct)
      setFieldValue('quantity', 1)
    }
  }, [values.typeOfSale])

  // Fn to update subproducts to sell
  useEffect(() => {
    setFieldValue('subproducts', subproductsValues)
  }, [subproductsValues])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form_container">
          <div className="disabledInput">
            <Input
              placeholder="Product category"
              label="Product category"
              onChange={handleChange('category')}
              value={values.category}
            />
          </div>

          {categoryData?.hasModel && (
            <div className="disabledInput">
              <Input
                placeholder="Product model"
                label="Product model"
                onChange={handleChange('model')}
                value={values.model}
              />
            </div>
          )}

          {categoryData?.hasColor && (
            <div className="box_con">
              <SelecInput
                label="Select size"
                placeholder="Category..."
                onChange={setFieldValue}
                errorMsg={errors.size}
                touched={touched.size}
                id="size"
                name="size"
                options={formatedSizeOptions}
              />

              {quantitiesLeft.size > 0 && (
                <p className="info_msg">{`This size has only ${quantitiesLeft.size} left`}</p>
              )}
            </div>
          )}

          {categoryData?.hasColor && (
            <div className="box_con">
              <SelecInput
                label="Select color"
                placeholder="Category..."
                onChange={setFieldValue}
                errorMsg={errors.color}
                touched={touched.color}
                id="color"
                name="color"
                options={formatedColorOptions}
              />

              {quantitiesLeft.color > 0 && (
                <p className="info_msg">{`This color has only ${quantitiesLeft.color} left`}</p>
              )}
            </div>
          )}

          {categoryData?.hasDesign && (
            <div className="box_con">
              <SelecInput
                label="Select design"
                placeholder="Design..."
                onChange={setFieldValue}
                errorMsg={errors.design}
                touched={touched.design}
                options={formatedDesignOptions}
                id="design"
                name="design"
              />

              {quantitiesLeft.design > 0 && (
                <p className="info_msg">{`This design has only ${quantitiesLeft.design} left`}</p>
              )}
            </div>
          )}

          {categoryData?.hasSubProducts && (
            <SelecInput
              label="Do you want to sell all or part of the sub-product(s)?"
              placeholder="Select option"
              onChange={setFieldValue}
              errorMsg={errors.typeOfSale}
              touched={touched.typeOfSale}
              options={[
                { value: 'sell all', label: 'Sell All' },
                { value: 'sell part', label: 'Sell Part' }
              ]}
              id="typeOfSale"
              name="typeOfSale"
            />
          )}

          {values.typeOfSale.trim() !== 'sell part' && (
            <div className="box_con">
              <Input
                label="Enter quantity"
                placeholder="quantity..."
                value={values.quantity}
                onChange={handleChange('quantity')}
                errorMsg={errors.quantity}
                touched={touched.quantity}
                onBlur={(e) => {
                  if (e.target.value < 1) {
                    setFieldValue('quantity', 1)
                  }
                }}
                type="number"
              />

              <p className="info_msg">
                {values.quantity * productData.cartoonsPerProduct} cartoon(s) to be supplied
              </p>
            </div>
          )}

          {categoryData?.hasSubProducts && values.typeOfSale.trim() === 'sell part' && (
            <div className="subproductQuantity_input_con">
              <h3>Enter quanity of each sub product</h3>
              <div className="box_con">
                {subproductsValues.map((i, key) => {
                  return (
                    <div className="box" key={key}>
                      <Input
                        label={i.name}
                        placeholder="Quantity..."
                        value={i.sellQuantity!}
                        onChange={(e) => {
                          subproductsValues[key].sellQuantity = e.target.value
                          setSubProductsValues([...subproductsValues])
                        }}
                        type="number"
                        onBlur={(e) => {
                          if (e.target.value > i.defaultQuantity) {
                            subproductsValues[key].sellQuantity = i.defaultQuantity
                            setSubProductsValues([...subproductsValues])
                            toastUI.error(
                              `This product has only ${i.defaultQuantity} ${i.name}(s) by default`
                            )
                          } else if (e.target.value < 0) {
                            subproductsValues[key].sellQuantity = 1

                            setSubProductsValues([...subproductsValues])
                            toastUI.error(`Value can't be less than 0`)
                          }

                          return
                        }}
                      />

                      <div className="default_quantity">{i.defaultQuantity}</div>
                    </div>
                  )
                })}
              </div>

              <div className="cartonQunatity">
                <Input
                  label="How many cartoons do u think will be supplied for this product?"
                  placeholder="Cartoon quantity"
                  value={values.cartoonQuantity}
                  onChange={handleChange('cartoonQuantity')}
                  errorMsg={errors.cartoonQuantity}
                  touched={touched.cartoonQuantity}
                  onBlur={(e) => {
                    if (e.target.value < 1) {
                      setFieldValue('cartoonQuantity', 1)
                    }
                  }}
                  type="number"
                />
              </div>
            </div>
          )}
        </div>

        <div className="btn">
          <Button
            text="Add to cart"
            type="submit"
            disable={productData.totalQuantity - quantityInCart === 0}
          />

          {quantityInCart > 0 && (
            <p className="info">
              There is only {productData.totalQuantity - quantityInCart} of this product left.{' '}
              {quantityInCart} is already in cart
            </p>
          )}
        </div>
      </form>
    </>
  )
}

export default SellProductForm
