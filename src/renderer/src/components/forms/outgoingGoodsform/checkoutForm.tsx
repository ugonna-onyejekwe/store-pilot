import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import Button from '@renderer/components/ui/Button'
import { Input, SelecInput } from '@renderer/components/ui/inputs'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { checkoutFormSchma } from './schema'

const CheckoutForm = ({ setFormStep }: { setFormStep: (value: number) => void }) => {
  // get stores
  const {
    isPending: isGettingWareHouses,
    data: wareHouses,
    mutateAsync: getwareHouses
  } = useReturnAllWarehouses()
  const onSubmit = () => {}

  useEffect(() => {
    getwareHouses()
  }, [])

  const { values, handleSubmit, setFieldValue, errors, touched, handleChange } = useFormik({
    initialValues: {
      paymentType: '',
      amountPaid: '',
      amountToPay: '',
      customerName: '',
      locationSold: ''
    },
    validationSchema: checkoutFormSchma,
    onSubmit
  })

  // PAYMENT TYPE OPTIONS
  const paymentTypes = [
    { label: 'Full payment', value: 'full' },
    { label: 'Half payment', value: 'half' },
    { label: 'Credit', value: 'credit' }
  ]

  return (
    <form onSubmit={handleSubmit} className="form_con checkout_form">
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

      {/* when payment type is half payment */}
      {values.paymentType === 'half' && (
        <div className="input_row_con">
          <Input
            label="Enter amount to pay"
            onChange={handleChange('amountToPay')}
            value={values.amountToPay}
            errorMsg={errors.amountToPay}
            touched={touched.amountToPay}
            placeholder="Enter selling price..."
            type="number"
          />

          <Input
            label="Enter amount paid"
            onChange={handleChange('amountPaid')}
            value={values.amountPaid}
            errorMsg={errors.amountPaid}
            touched={touched.amountPaid}
            placeholder="Enter selling price..."
            type="number"
          />
        </div>
      )}

      {/* when payment type is credit */}
      {values.paymentType === 'credit' && (
        <Input
          label="Enter amount to pay"
          onChange={handleChange('amountPaid')}
          value={values.amountToPay}
          errorMsg={errors.amountToPay}
          touched={touched.amountToPay}
          placeholder="Enter selling price..."
          type="number"
        />
      )}

      <div className="input_row_con">
        <SelecInput
          label="Where was this product sold?"
          onChange={setFieldValue}
          errorMsg={errors.locationSold}
          touched={touched.locationSold}
          name="locationSold"
          id="locationSold"
          options={wareHouses?.map((i) => ({ label: i.name, value: i.name })) ?? []}
          placeholder="Select"
          isLoading={isGettingWareHouses}
        />
      </div>

      <Input
        label="Customer name"
        onChange={handleChange('customerName')}
        value={values.customerName}
        errorMsg={errors.customerName}
        touched={touched.customerName}
        placeholder="Enter customer name..."
      />

      <div className="btns">
        <Button text="Back" type="button" varient="outline" onClick={() => setFormStep(1)} />
        <Button text="Checkout" type="submit" isLoading={false} />
      </div>
    </form>
  )
}

export default CheckoutForm
