import Button from '@renderer/components/ui/Button'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import AlertModal from '../../ui/alertModal'
import { SelecInput } from '../../ui/inputs'
import { Addproduct__ActionModal_Schame } from './schema'

interface Addproduct__ActionModalProps {
  open: boolean
  onOpenChange: (value: boolean) => void
  handleSubmit: (values: { actionType: string }) => void
}

const Addproduct__ActionModal = ({
  open,
  onOpenChange,
  handleSubmit: proceedAction
}: Addproduct__ActionModalProps) => {
  const selectOption = [
    {
      value: 'new',
      label: 'Create a New Product '
    },
    {
      value: 'update',
      label: "Update an Existing Product's Information"
    }
  ]

  const onSubmit = (values) => {
    proceedAction(values)
  }

  const { setFieldValue, errors, touched, handleSubmit } = useFormik({
    initialValues: {
      actionType: ''
    },
    validationSchema: Addproduct__ActionModal_Schame,
    onSubmit
  })

  return (
    <AlertModal
      open={open}
      onOpenChange={onOpenChange}
      className="Addproduct__ActionModal"
      isCloseable={false}
    >
      <form onSubmit={handleSubmit}>
        <h3>Please select the action you wish to perform:</h3>

        <SelecInput
          label=""
          placeholder="Select"
          options={selectOption}
          onChange={setFieldValue}
          name="actionType"
          id="actionType"
          errorMsg={errors.actionType}
          touched={touched.actionType}
        />

        <div className="btns">
          <Link to={'/admin'}>
            <Button text="Cancel" varient="outline" />
          </Link>

          <Button text="Proceed" type="submit" />
        </div>
      </form>
    </AlertModal>
  )
}

export default Addproduct__ActionModal
