import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import Button from '@renderer/components/ui/Button'
import { Input, SelecInput } from '@renderer/components/ui/inputs'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { checkoutFormSchma } from '../schemas'

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

  const { handleSubmit, setFieldValue, errors, touched, handleChange } = useFormik({
    initialValues: {},
    validationSchema: checkoutFormSchma,
    onSubmit
  })
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Enter selling price"
        onChange={handleChange('sellingPrice')}
        //   value={values.sellingPrice}
        //   errorMsg={errors.sellingPrice}
        //   touched={touched.sellingPrice}
        placeholder="Enter selling price..."
        type="number"
      />

      <SelecInput
        label="Select payment type"
        onChange={setFieldValue}
        //   errorMsg={errors.paymentType}
        //   touched={touched.paymentType}
        name="paymentType"
        id="paymentType"
        //   options={paymentTypes}
        placeholder="Select"
      />

      {/* {values.paymentType.trim() === 'Half payment' && ( */}
      <Input
        label="Enter amount paid"
        onChange={handleChange('amountPaid')}
        // value={values.amountPaid}
        // errorMsg={errors.amountPaid}
        // touched={touched.amountPaid}
        placeholder="Enter selling price..."
        type="number"
      />
      {/* )} */}

      <SelecInput
        label="Where was this product sold?"
        onChange={setFieldValue}
        //   errorMsg={errors.sellLocation}
        //   touched={touched.sellLocation}
        name="sellLocation"
        id="sellLocation"
        options={wareHouses?.map((i) => ({ label: i.name, value: i.name })) ?? []}
        placeholder="Select"
        isLoading={isGettingWareHouses}
      />

      <SelecInput
        label="Select supply status"
        onChange={setFieldValue}
        // errorMsg={errors.supplyStatus}
        // touched={touched.supplyStatus}
        name="supplyStatus"
        id="supplyStatus"
        // options={supplyStatus}
        placeholder="Select"
      />

      <Input
        label="Customer name"
        onChange={handleChange('customerName')}
        // value={values.customerName}
        // errorMsg={errors.customerName}
        // touched={touched.customerName}
        placeholder="Enter customer name..."
      />

      <div className="btn">
        <Button text="Back" type="button" varient="outline" onClick={() => setFormStep(1)} />
        <Button text="Checkout" type="submit" isLoading={false} />
      </div>
    </form>
  )
}

export default CheckoutForm
