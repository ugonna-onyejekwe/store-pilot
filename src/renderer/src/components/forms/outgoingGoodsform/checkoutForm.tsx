import { useCheckCustomerName } from '@renderer/apis/customer/checkCustomerName'
import { useGetCustomers } from '@renderer/apis/customer/getCustomers'
import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { BooleanInput, Input, SelecInput } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { checkoutFormSchma } from './schema'

const CheckoutForm = ({ setFormStep }: { setFormStep: (value: number) => void }) => {
  const [openAlert, setOpenAlert] = useState(false)

  // get stores
  const {
    isPending: isGettingWareHouses,
    data: wareHouses,
    mutateAsync: getwareHouses
  } = useReturnAllWarehouses()

  // get customers
  const { isPending: isGettingCustomers, data: customers, mutate: getCustomers } = useGetCustomers()

  // check customer name availablity
  const { isPending: checkingName, mutateAsync: checkName } = useCheckCustomerName()

  const onSubmit = (values) => {
    if (values.isNewCustomer === true) {
      checkName({ customerName: values.customerName }).then(() => {
        toastUI.success('Available')

        setOpenAlert(true)
      })
    }
  }

  useEffect(() => {
    getwareHouses()
  }, [])

  const { values, handleSubmit, setFieldValue, errors, touched, handleChange } = useFormik({
    initialValues: {
      paymentType: '',
      amountPaid: '',
      amountToPay: '',
      customerName: '',
      customerId: '',
      locationSold: '',
      isNewCustomer: false
    },
    validationSchema: checkoutFormSchma,
    onSubmit
  })

  useEffect(() => {
    if (values.isNewCustomer === false) {
      getCustomers()
    }
  }, [values.isNewCustomer])

  useEffect(() => {
    if (customers?.length === 0) {
      toastUI.error('No customer has been saved to your store')
    }
  }, [customers])

  // handle checkout
  const handleCheckOut = (saveCustomerName: boolean) => {}

  // PAYMENT TYPE OPTIONS
  const paymentTypes = [
    { label: 'Full payment', value: 'full' },
    { label: 'Half payment', value: 'half' },
    { label: 'Credit', value: 'credit' }
  ]

  return (
    <>
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

        <BooleanInput
          label="Are you selling to a new customer?"
          value={values.isNewCustomer}
          onChange={setFieldValue}
          name="isNewCustomer"
        />

        {values.isNewCustomer && (
          <Input
            label="Customer name"
            onChange={handleChange('customerName')}
            value={values.customerName}
            errorMsg={errors.customerName}
            touched={touched.customerName}
            placeholder="Enter customer name..."
          />
        )}

        {values.isNewCustomer === false && (
          <SelecInput
            label="Select customer"
            placeholder="Select..."
            id="customerId"
            name="customerId"
            onChange={setFieldValue}
            options={customers?.map((i) => ({ value: i.id, label: i.name })) ?? []}
          />
        )}

        <div className="btns">
          <Button text="Back" type="button" varient="outline" onClick={() => setFormStep(1)} />
          <Button text="Checkout" type="submit" isLoading={checkingName} />
        </div>
      </form>

      <AlertSaveCustomer
        customerName={values.customerName}
        open={openAlert}
        onOpenChange={setOpenAlert}
        handleProceed={handleCheckOut}
      />
    </>
  )
}

export default CheckoutForm

const AlertSaveCustomer = ({
  open,
  onOpenChange,
  handleProceed,
  customerName
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  handleProceed: (saveCustomerName: boolean) => void
  customerName: string
}) => {
  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="save_customer_name_modal">
      <h2>Save cutomers</h2>

      <p>
        Will you like to save <b>{customerName}</b> to your store?{' '}
      </p>

      <div className="btns">
        <Button
          text="No, don't save"
          varient="outline"
          onClick={() => {
            handleProceed(false)
          }}
        />
        <Button
          text="Save"
          onClick={() => {
            handleProceed(true)
          }}
        />
      </div>
    </AlertModal>
  )
}
