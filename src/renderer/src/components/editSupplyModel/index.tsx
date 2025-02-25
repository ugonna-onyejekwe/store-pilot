import { useEditSupplyStatus } from '@renderer/apis/history/editSupplyStatus'
import { useFormik } from 'formik'
import { SelecInput } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import './styles.scss'

type EditSupplyModelProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  checkoutId: string
  zIndex?: number
  reFetchHistry?: () => void
}

const EditSupplyModel = ({
  open,
  onOpenChange,
  checkoutId,
  zIndex,
  reFetchHistry
}: EditSupplyModelProps) => {
  const { isPending, mutateAsync } = useEditSupplyStatus()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (values.supplyStatus === '') {
      toastUI.error('Select a value')
      return
    }

    mutateAsync({
      checkoutId: checkoutId,
      status: values.supplyStatus
    })
      .then(() => {
        onOpenChange(false)
        reFetchHistry && reFetchHistry()
        toastUI.success('Supply status updated')
      })
      .catch((error) => console.log(error))
  }

  const { setFieldValue, values } = useFormik({
    initialValues: { supplyStatus: '' },
    onSubmit
  })

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} zIndex={zIndex} className="Edit_status_con">
      <h3>Edit supply status</h3>
      <form onSubmit={onSubmit}>
        <SelecInput
          options={[
            {
              label: 'Supplied',
              value: 'Supplied'
            },

            {
              label: 'Not supplied',
              value: 'Not supplied'
            }
          ]}
          placeholder="Select"
          label="Select supply status"
          id="supplyStatus"
          name="supplyStatus"
          onChange={setFieldValue}
        />

        <div className="btns">
          <Button text={'Cancel'} varient="outline" onClick={() => onOpenChange(false)} />
          <Button text="Proceed" type="submit" isLoading={isPending} />
        </div>
      </form>
    </AlertModal>
  )
}

export default EditSupplyModel
