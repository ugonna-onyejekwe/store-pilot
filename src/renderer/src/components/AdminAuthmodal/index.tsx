import { useAdminResetPassword } from '@renderer/apis/auth/adminResetPass'
import { useFormik } from 'formik'
import { AdminAuthValidationSchema } from '../forms/schemas'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Input } from '../ui/inputs'
import { toastUI } from '../ui/toast'
import './styles.scss'

const AuthModal = ({
  open,
  setOnOPenChange
}: {
  open: boolean
  setOnOPenChange: (value: boolean) => void
}) => {
  const { isPending, mutateAsync } = useAdminResetPassword()

  const onSubmit = (values) => {
    mutateAsync({ oldPassword: values.oldPassword, newPassword: values.newPassword })
      .then(() => {
        toastUI.success('Password reset successful')
        resetForm()
        setOnOPenChange(false)
      })
      .catch((error) => console.log(error))
  }

  const { values, handleChange, resetForm, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: ''
    },
    validationSchema: AdminAuthValidationSchema,
    onSubmit
  })

  return (
    <AlertModal open={open} onOpenChange={setOnOPenChange} className="admin_auth_form">
      <form onSubmit={handleSubmit}>
        <h2>Password setting</h2>
        <p className="sub_header">Enter detials to reset password</p>

        <div className="con">
          <Input
            placeholder="Old password"
            label="Enter old password"
            value={values.oldPassword}
            onChange={handleChange('oldPassword')}
            errorMsg={errors.oldPassword}
            touched={touched.oldPassword}
          />

          <Input
            placeholder="New password"
            label="Enter new password"
            value={values.newPassword}
            onChange={handleChange('newPassword')}
            errorMsg={errors.newPassword}
            touched={touched.newPassword}
          />
        </div>

        <Button text="Reset password" type="submit" isLoading={isPending} />
      </form>
    </AlertModal>
  )
}

export default AuthModal
