import { useCheckCustomerName } from '@renderer/apis/customer/checkCustomerName'
import { useGetCustomers } from '@renderer/apis/customer/getCustomers'
import { useSaveCustomer } from '@renderer/apis/customer/saveCustomer'
import { useCheckout } from '@renderer/apis/products/checkout'
import { useReturnAllWarehouses } from '@renderer/apis/warehouses/getAllWarehouses'
import { getError } from '@renderer/lib/utils'
import { RootState } from '@renderer/store'
import { clearCart } from '@renderer/store/cartSlice'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkoutFormSchma } from '../forms/schemas'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Icons } from '../ui/icons'
import { BooleanInput, Input, SelecInput } from '../ui/inputs'
import { toastUI } from '../ui/toast'
import './styles.scss'

const CheckOutForm = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)
  const { mutateAsync, isPending } = useCheckout()
  const [openSuccessModel, setOpenSuccessModel] = useState(false)
  const [openSaveModel, setOpenSaveModel] = useState(false)
  const {
    isPending: isGettingWareHouses,
    data: wareHouses,
    mutateAsync: getwareHouses
  } = useReturnAllWarehouses()
  const { isPending: isSaving, mutateAsync: saveCustomer } = useSaveCustomer()
  const { isPending: isSaving2, mutateAsync: checkName } = useCheckCustomerName()

  const { data: customers, isPending: isGettingCustomers, mutate: getCutomers } = useGetCustomers()

  const initialValues = {
    isNewCustomer: false,
    customerName: '',
    sellLocation: '',
    customerId: ''
  }

  const onSubmit = (values) => {
    if (!values.isNewCustomer) {
      mutateAsync({
        listOfProducts: [...cartItems],
        checkoutInfo: {
          locationSold: values.sellLocation,
          customerId: values.customerId,
          customerName: values.customerName
        }
      })
        .then(() => setOpenSuccessModel(true))
        .catch((error) => {
          console.log(error)
          toastUI.error(getError(error))
        })

      return
    }

    setOpenSaveModel(true)
  }

  const saveCustomer__sheckout = (save: boolean) => {
    try {
      if (save) {
        checkName({
          customerName: values.customerName
        }).then(() => {
          saveCustomer({ customerName: values.customerName }).then((res) => {
            mutateAsync({
              listOfProducts: [...cartItems],
              checkoutInfo: {
                locationSold: values.sellLocation,
                // @ts-ignore:undefined
                customerId: res?.data?.id,
                customerName: values.customerName
              }
            })
              .then(() => setOpenSuccessModel(true))
              .catch((error) => {
                console.log(error)
              })
          })
        })

        return
      }

      mutateAsync({
        listOfProducts: [...cartItems],
        checkoutInfo: {
          locationSold: values.sellLocation,
          // @ts-ignore:undefined
          customerId: values.customerName,
          customerName: values.customerName
        }
      })
        .then(() => setOpenSuccessModel(true))
        .catch((error) => {
          console.log(error)
          toastUI.error(getError(error))
        })
    } catch (error) {
      console.log(error)
    }
  }

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: checkoutFormSchma,
    onSubmit
  })

  const totalCartons = cartItems.reduce(
    (cartoons, item) => Number(cartoons) + Number(item.cartoonQuantity),
    0
  )

  useEffect(() => {
    getwareHouses().catch((error) => console.log(error))
    getCutomers()
  }, [])

  return (
    <>
      <div className="checkout_form">
        <form onSubmit={handleSubmit}>
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

          <BooleanInput
            label="Is this customer a new customer?"
            value={values.isNewCustomer}
            onChange={setFieldValue}
            name="isNewCustomer"
          />

          {values.isNewCustomer ? (
            <Input
              label="Customer name"
              onChange={handleChange('customerName')}
              value={values.customerName}
              errorMsg={errors.customerName}
              touched={touched.customerName}
              placeholder="Enter customer name..."
            />
          ) : (
            <SelecInput
              label="Select customer name"
              onChange={setFieldValue}
              errorMsg={errors.customerId}
              touched={touched.customerId}
              name="customerId"
              id="customerId"
              options={customers?.map((i) => ({ label: i.name, value: i.id })) ?? []}
              placeholder="Select"
              isLoading={isGettingCustomers}
            />
          )}

          <div className="btn">
            <Button text="Checkout" type="submit" isLoading={isPending} />
          </div>
        </form>
      </div>

      <SaveCustomerModel
        open={openSaveModel}
        onOpenChange={setOpenSaveModel}
        handleSave={(value) => saveCustomer__sheckout(value)}
        isLoading={isSaving || isSaving2}
      />

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

const SaveCustomerModel = ({
  open,
  onOpenChange,
  handleSave,
  isLoading
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  handleSave: (value: boolean) => void
  isLoading: boolean
}) => {
  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="checkout__successModel">
      <h2>Save customer</h2>

      <p>Would you love to save this new customer to store?</p>

      <div className="btns">
        <Button varient="outline" text="Don't save" onClick={() => handleSave(false)} />
        <Button
          text="Yes, save"
          onClick={() => {
            handleSave(true)
          }}
          isLoading={isLoading}
        />
      </div>
    </AlertModal>
  )
}

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
  const navigate = useNavigate()

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

      <div className="btns single">
        <Button
          text="Save"
          onClick={() => {
            onOpenChange(false)
            dispatch(clearCart())
            navigate('/goods')
          }}
        />
      </div>
    </AlertModal>
  )
}
