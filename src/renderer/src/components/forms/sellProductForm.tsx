import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Input, SelecInput } from '../inputs'
import Button from '../ui/Button'
import { sellProductSchema } from './schemas'

const SellProductForm = () => {
  const [openSubProductQuantity, setOpenSubProductQuantity] = useState(false)
  const initialvalues = {
    category: '',
    model: '',
    color: '',
    design: '',
    quantity: 1,
    typeOfSale: ''
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialvalues,
    validationSchema: sellProductSchema,
    onSubmit
  })

  useEffect(() => {
    console.log(
      values.typeOfSale,
      values.typeOfSale !== '' && values.typeOfSale.trim() === 'Sell Part',
      values.typeOfSale.toLowerCase(),
      values.typeOfSale.toLowerCase() === 'sell part'
    )
    if (values.typeOfSale !== '' && values.typeOfSale.toLowerCase().trim() === 'sell part')
      return setOpenSubProductQuantity(true)
  }, [values.typeOfSale])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form_container">
          <Input
            placeholder="Product category"
            label="Product category"
            onChange={handleChange('category')}
            value={values.category}
          />

          <Input
            placeholder="Product model"
            label="Product model"
            onChange={handleChange('model')}
            value={values.category}
          />

          <SelecInput
            label="Select color"
            placeholder="Category..."
            onChange={setFieldValue}
            errorMsg={errors.color}
            touched={touched.color}
            id="color"
            name="color"
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]}
          />

          <SelecInput
            label="Select design"
            placeholder="Design..."
            onChange={handleChange('design')}
            errorMsg={errors.design}
            touched={touched.design}
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]}
            id="design"
            name="design"
          />

          <SelecInput
            label="Do you want to sell all or part of the sub-product(s)?"
            placeholder="Select option"
            onChange={setFieldValue}
            errorMsg={errors.design}
            touched={touched.design}
            options={[
              { value: 'Sell All', label: 'Sell All' },
              { value: 'Sell Part ', label: 'Sell Part' }
            ]}
            id="typeOfSale"
            name="typeOfSale"
          />

          <Input
            label="Enter quantity"
            placeholder="quantity..."
            value={values.quantity}
            onChange={handleChange('quantity')}
            errorMsg={errors.quantity}
            touched={touched.quantity}
            type="number"
          />

          <div className="subproductQuantity">
            <h3>Enter qunaity of each sub product</h3>

            <div className="box_con">
              <div className="box">
                <Input
                  label="Enter quantity"
                  placeholder="quantity..."
                  value={values.quantity}
                  onChange={handleChange('quantity')}
                  errorMsg={errors.quantity}
                  touched={touched.quantity}
                  type="number"
                />

                <div className="default_quantity">3</div>
              </div>

              <div className="box">
                <Input
                  label="Enter quantity"
                  placeholder="quantity..."
                  value={values.quantity}
                  onChange={handleChange('quantity')}
                  errorMsg={errors.quantity}
                  touched={touched.quantity}
                  type="number"
                />
                <div className="default_quantity">3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="btn">
          <Button text="Add to cart" type="submit" />
        </div>
      </form>
    </>
  )
}

export default SellProductForm
