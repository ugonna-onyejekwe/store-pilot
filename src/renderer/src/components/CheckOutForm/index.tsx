import { useCheckout } from '@renderer/apis/products/checkout'
import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import { getError } from '@renderer/lib/utils'
import { RootState } from '@renderer/store'
import { clearCart } from '@renderer/store/cartSlice'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutFormSchma } from '../forms/schemas'
import { Input, SelecInput } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Icons } from '../ui/icons'
import { toastUI } from '../ui/toast'
import './styles.scss'

const CheckOutForm = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)
  const { mutateAsync, isPending } = useCheckout()
  const [openSuccessModel, setOpenSuccessModel] = useState(false)
  const {
    isPending: isGettingWareHouses,
    data: wareHouses,
    mutateAsync: getwareHouses
  } = useReturnAllWarehouses()

  const initialValues = {
    sellingPrice: '',
    paymentType: '',
    amountPaid: '',
    supplyStatus: '',
    customerName: '',
    phoneNumber: '',
    sellLocation: '',
    supplyLocation: ''
  }

  const onSubmit = (values) => {
    mutateAsync({
      listOfProducts: [...cartItems],
      checkoutInfo: {
        locationSold: values.sellLocation,
        customerName: values.customerName,
        customerPhoneNumber: values.phoneNumber,
        supplyStatus: values.supplyStatus,
        paymentStatus: values.paymentType,
        sellingPrice: values.sellingPrice,
        amountPaid: values.amountPaid,
        supplyLocation: values.supplyLocation
      }
    })
      .then(() => setOpenSuccessModel(true))
      .catch((error) => {
        console.log(error)
        toastUI.error(getError(error))
      })
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

  const totalCartons = cartItems.reduce(
    (cartoons, item) => Number(cartoons) + Number(item.cartoonQuantity),
    0
  )
  useEffect(() => {
    values.paymentType.trim() !== 'Half payment' ? setFieldValue('amountPaid', '') : null
  }, [values.paymentType])

  useEffect(() => {
    getwareHouses().catch((error) => console.log(error))
  }, [])

  return (
    <>
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
            label="Where was this product sold?"
            onChange={setFieldValue}
            errorMsg={errors.sellLocation}
            touched={touched.sellLocation}
            name="sellLocation"
            id="sellLocation"
            options={wareHouses?.map((i) => ({ label: i.name, value: i.name })) ?? []}
            placeholder="Select"
            isLoading={isGettingWareHouses}
          />

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

          <Input
            label="Where will you be supppling the product to? (optional)"
            onChange={handleChange('supplyLocation')}
            errorMsg={errors.supplyLocation}
            touched={touched.supplyLocation}
            value={values.supplyLocation}
            placeholder="Location.."
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
            <Button text="Checkout" type="submit" isLoading={isPending} />
          </div>
        </form>
      </div>

      <Checkout_SuccessModel
        totalCartons={totalCartons}
        customerName={values.customerName}
        open={openSuccessModel}
        onOpenChange={setOpenSuccessModel}
      />
    </>
  )
}

export default CheckOutForm

type Checkout_SuccessModelProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  customerName: string
  totalCartons: number
}

const Checkout_SuccessModel = ({
  open,
  onOpenChange,
  customerName,
  totalCartons
}: Checkout_SuccessModelProps) => {
  const dispatch = useDispatch()

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      className="checkout__successModel"
      isCloseable={false}
    >
      <span>
        <Icons.CheckIcon className="checkIcon" />
      </span>

      <h2>Checkout was successful</h2>

      <p>Approximately,</p>

      <h3>
        {totalCartons}
        <span>Cartoon(s)</span>
      </h3>

      <p>
        is to be supplied to <b>{customerName}</b>
      </p>

      <div className="btns">
        <Button varient="outline" text="Print doc" />
        <Button
          text="Understood 👍"
          onClick={() => {
            onOpenChange(false)

            dispatch(clearCart())
          }}
        />
      </div>
    </AlertModal>
  )
}
