import { useEditPayment } from '@renderer/apis/history/editpayment'
import { HistoryResponse } from '@renderer/apis/history/getHistory'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Input } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import './styles.scss'

type EditPaymentModelProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  zIndex?: number
  data: HistoryResponse
  reFetchHistry?: () => void
}

const EditPaymentModel = ({
  open,
  onOpenChange,
  zIndex,
  data,
  reFetchHistry
}: EditPaymentModelProps) => {
  const [amountLeft, setAmountLeft] = useState(0)
  const { isPending, mutateAsync: EditPayment } = useEditPayment()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (Number(values.amountPaid) < 1) {
      toastUI.error("Amount can't be less than zero")
      return
    }

    EditPayment({
      amountPaid: values.amountPaid,
      checkoutId: data.checkoutInfo.checkoutId
    })
      .then(() => {
        onOpenChange(false)
        reFetchHistry && reFetchHistry()
      })
      .catch((error) => console.log(error))
  }

  const { values, handleChange } = useFormik({
    initialValues: {
      amountPaid: 0
    },
    onSubmit
  })

  useEffect(() => {
    const value =
      Number(data.checkoutInfo.sellingPrice) -
      Number(data.checkoutInfo.amountPaid) -
      Number(values.amountPaid)

    setAmountLeft(value < 0 ? 0 : value)
  }, [values.amountPaid])

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      zIndex={zIndex}
      className="EditPaymentModal"
    >
      <form onSubmit={onSubmit}>
        <h3>Edit payment</h3>
        <p className="subHeader">
          <b>{data.checkoutInfo.customerName}</b> bought goods worth{' '}
          <b>{convertAmount(data.checkoutInfo.sellingPrice)}</b> on{' '}
          <b>{formatDate(data.checkoutInfo.createdAt)}</b>
        </p>

        <div className="box_con">
          <Input
            label="Initail payment"
            placeholder="Payment"
            value={convertAmount(data.checkoutInfo.amountPaid)}
            onChange={() => {}}
            disabled
          />

          <div className="box">
            <Input
              label="Enter new payment"
              placeholder="Enter amount"
              value={values.amountPaid}
              onChange={handleChange('amountPaid')}
              type="number"
            />

            <p>Amount left to pay: {convertAmount(amountLeft)}</p>
          </div>
        </div>

        <div className="btns">
          <Button text={'Cancel'} varient="outline" onClick={() => onOpenChange(false)} />
          <Button text={'Proceed'} type="submit" isLoading={isPending} />
        </div>
      </form>
    </AlertModal>
  )
}

export default EditPaymentModel
