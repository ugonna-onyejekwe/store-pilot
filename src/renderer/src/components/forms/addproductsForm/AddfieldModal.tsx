import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Input } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { useFormik } from 'formik'
import { AddFieldSchema } from './schema'

type AddfieldModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  label: string
  handleProceed: (values: { fieldName: string }) => void
  previousValues: string[]
}

const AddfieldModal = ({
  open,
  onOpenChange,
  label,
  previousValues,
  handleProceed
}: AddfieldModalProps) => {
  const onSubmit = (values) => {
    const alreadyExist = previousValues.find(
      (i) => i.toLowerCase() === values.fieldName.toLowerCase()
    )

    if (alreadyExist) {
      toastUI.error('Field already exist')
      return
    }

    handleProceed(values)
    resetForm()
    onOpenChange(false)
  }

  const { values, resetForm, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      fieldName: ''
    },
    validationSchema: AddFieldSchema,
    onSubmit
  })

  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="add_field_Modal">
      <form onSubmit={handleSubmit}>
        <Input
          label={label}
          placeholder="Enter field name..."
          value={values.fieldName}
          onChange={handleChange('fieldName')}
          errorMsg={errors.fieldName}
          touched={touched.fieldName}
        />

        <Button text="Create field" type="submit" />
      </form>
    </AlertModal>
  )
}

export default AddfieldModal
