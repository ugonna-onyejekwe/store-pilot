import { useCheckCustomerName } from '@renderer/apis/customer/checkCustomerName'
import { useGetCustomers } from '@renderer/apis/customer/getCustomers'
import { useSaveCustomer } from '@renderer/apis/customer/saveCustomer'
import { useCheckout } from '@renderer/apis/products/checkout'
import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { BooleanInput, Input, SelecInput } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { checkoutFormSchma } from './schema'

type CheckoutFormTypes = {
  setFormStep: (value: number) => void
  productData: sellGoodsModelInitailValueType
  openSuccessMsg: (value: string) => void
}

const CheckoutForm = ({ setFormStep, productData, openSuccessMsg }: CheckoutFormTypes) => {
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

  // save customer to store
  const { isPending: isSavingCustomerName, mutateAsync: saveCustomerNameFn } = useSaveCustomer()

  // checkout fn
  const { isPending: isCheckingOut, mutateAsync: checkoutFn } = useCheckout()

  const onSubmit = (values) => {
    if (values.isNewCustomer === true) {
      checkName({ customerName: values.customerName }).then(() => {
        setOpenAlert(true)
      })

      return
    }

    handleCheckOut(false)
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
  const handleCheckOut = (saveCustomerName: boolean) => {
    console.log(productData)
    if (saveCustomerName) {
      // save customer name
      saveCustomerNameFn({
        customerName: values.customerName,
        typeOfPayment: values.paymentType,
        amountPaid: Number(values.amountPaid),
        amountToPay: Number(values.amountToPay)
      })
        .then(() => {
          checkoutFn({
            listOfProducts: [productData],
            checkoutInfo: {
              ...values
            }
          })
        })
        .then(() => {
          openSuccessMsg(values.customerName)
        })
        .catch((error) => {
          console.log(error)
        })

      // sell product
      // display cartoons to be supplied
      return
    }

    // sell product

    // display cartoons to be supplied
    // when customer is not a new customer: get customer name
    const customer = customers?.find((i) => i.id === values.customerId)

    checkoutFn({
      listOfProducts: [productData],
      checkoutInfo: {
        ...values,
        customerId: customer ? customer.id : ''
      }
    })
      .then(() => {
        openSuccessMsg(customer?.name ?? '')
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
            onChange={handleChange('amountToPay')}
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
            isLoading={isGettingCustomers}
          />
        )}

        <div className="btns">
          <Button text="Back" type="button" varient="outline" onClick={() => setFormStep(1)} />
          <Button
            text="Checkout"
            type="submit"
            isLoading={checkingName || isSavingCustomerName || isCheckingOut}
            onClick={() => console.log(errors)}
          />
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
            onOpenChange(false)
          }}
        />
        <Button
          text="Save"
          onClick={() => {
            handleProceed(true)
            onOpenChange(false)
          }}
        />
      </div>
    </AlertModal>
  )
}
