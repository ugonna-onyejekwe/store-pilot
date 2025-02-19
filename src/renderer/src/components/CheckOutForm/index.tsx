import { useFormik } from 'formik'
import { checkoutFormSchma } from '../forms/schemas'
import { Input, SelecInput } from '../inputs'
import Button from '../ui/Button'
import './styles.scss'

const CheckOutForm = () => {
  const initialValues = {
    sellingPrice: '',
    paymentType: '',
    amountPaid: '',
    supplyStatus: '',
    customerName: '',
    phoneNumber: '',
    sellLocation: ''
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: checkoutFormSchma,
    onSubmit
  })

  // PAYMENT TYPE OPTIONS
  const paymentTypes = [
    { label: 'Full payment', value: 'Full payment' },
    { label: 'Half payment', value: 'Half payment' },
    { label: 'Credit', value: 'Credit' }
  ]

  // SUPPLY TYPE OPTIONS
  const supplyStatus = [
    { label: 'Supplied', value: 'Supplied' },
    { label: 'Not supplied', value: 'Not supplied' }
  ]

  return (
    <div className="checkout_form">
      <form onSubmit={handleSubmit}>
        <Input
          label="Enter selling price"
          onChange={handleChange('sellingPrice')}
          value={values.sellingPrice}
          errorMsg={errors.sellingPrice}
          touched={touched.sellingPrice}
          placeholder="Enter selling price..."
          type="number"
        />

        <SelecInput
          label="Select payment type"
          onChange={setFieldValue}
          errorMsg={errors.paymentType}
          touched={touched.paymentType}
          name="paymentType"
          id="paymentType"
          options={paymentTypes}
          placeholder="Select"
        />

        {values.paymentType.trim() === 'Half payment' && (
          <Input
            label="Enter amount paid"
            onChange={handleChange('amountPaid')}
            value={values.amountPaid}
            errorMsg={errors.amountPaid}
            touched={touched.amountPaid}
            placeholder="Enter selling price..."
            type="number"
          />
        )}

        <SelecInput
          label="Select supply status"
          onChange={setFieldValue}
          errorMsg={errors.supplyStatus}
          touched={touched.supplyStatus}
          name="supplyStatus"
          id="supplyStatus"
          options={supplyStatus}
          placeholder="Select"
        />

        <SelecInput
          label="Where was this product sold?"
          onChange={setFieldValue}
          errorMsg={errors.sellLocation}
          touched={touched.sellLocation}
          name="sellLocation"
          id="sellLocation"
          options={supplyStatus}
          placeholder="Select"
        />

        <Input
          label="Customer name"
          onChange={handleChange('customerName')}
          value={values.customerName}
          errorMsg={errors.customerName}
          touched={touched.customerName}
          placeholder="Enter customer name..."
        />

        <Input
          label="Enter customer phone number (optional)"
          onChange={handleChange('phoneNumber')}
          value={values.phoneNumber}
          errorMsg={errors.phoneNumber}
          touched={touched.phoneNumber}
          placeholder="Enter phone number..."
          type="number"
        />

        <div className="btn">
          <Button text="Checkout" type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CheckOutForm
