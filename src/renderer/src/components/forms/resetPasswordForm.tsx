import { useResetPassword } from '@renderer/apis/auth/reset-password'
import { usevalidateDev } from '@renderer/apis/auth/validateDev'
import { getError } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Input } from '../inputs'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import { NewPasswordSchema, ResetPasswordSchema } from './schemas'

const ResetPasswordForm = ({
  setLoggingIn,
  forgottenPassword,
  setOpenModel
}: {
  setLoggingIn?: (value: boolean) => void
  setOpenModel?: (value: boolean) => void
  forgottenPassword: boolean
}) => {
  const { mutateAsync, isPending } = usevalidateDev()
  const [formStep, setFormStep] = useState(!forgottenPassword ? 2 : 1)

  const onSubmit = (values) => {
    mutateAsync({
      developerName: values.developerFirstName.trim(),
      developerPhoneNumber: values.developerPhoneNumber.trim()
    })
      .then(() => {
        setFormStep(2)
        resetForm()
      })
      .catch((error) => toastUI.error(getError(error)))
  }

  const { values, handleChange, resetForm, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      developerFirstName: '',
      developerPhoneNumber: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit
  })

  return (
    <div className="forgotten_password_form">
      {!forgottenPassword ? <h2>Password setting</h2> : <h2>Forgotten password</h2>}
      <p className="sub_header">Enter detials to reset password</p>
      {/* form1 */}

      {formStep === 1 && (
        <form onSubmit={handleSubmit} className="developer_details_form">
          <Input
            label="Enter developer first name"
            placeholder="Enter name"
            value={values.developerFirstName}
            onChange={handleChange('developerFirstName')}
            errorMsg={errors.developerFirstName}
            touched={touched.developerFirstName}
          />

          <Input
            label="Enter developer phone number"
            placeholder="Enter phone no."
            value={values.developerPhoneNumber}
            onChange={handleChange('developerPhoneNumber')}
            errorMsg={errors.developerPhoneNumber}
            touched={touched.developerPhoneNumber}
          />

          <span className="remeber_password" onClick={() => setLoggingIn && setLoggingIn(true)}>
            Remembered password?
          </span>

          <Button text="Proceed" type="submit" isLoading={isPending} />
        </form>
      )}

      {/* form 2 */}
      {formStep === 2 && (
        <NewPasswordForm setOpenModel={setOpenModel} setLoggingIn={setLoggingIn} />
      )}
    </div>
  )
}

export default ResetPasswordForm

// NEW PASSWORD FORM
const NewPasswordForm = ({
  setLoggingIn,
  setOpenModel
}: {
  setLoggingIn?: (value: boolean) => void
  setOpenModel?: (value: boolean) => void
}) => {
  const { mutateAsync, isPending } = useResetPassword()

  const onSubmit = (values) => {
    mutateAsync({
      newPassword: values.newPassword.trim()
    })
      .then(() => {
        toastUI.success('Password reset successful')
        toastUI.success('You can now login with your new password')
        setLoggingIn && setLoggingIn(true)
        resetForm()
        setOpenModel && setOpenModel(false)
      })
      .catch((error) => console.log(error))
  }

  const { values, handleChange, resetForm, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: NewPasswordSchema,
    onSubmit
  })

  return (
    <form onSubmit={handleSubmit} className="new_password_form">
      <Input
        label="What's your new password"
        placeholder="Password..."
        value={values.newPassword}
        onChange={handleChange('newPassword')}
        errorMsg={errors.newPassword}
        touched={touched.newPassword}
      />

      <Input
        label="Confirm new password"
        placeholder="Password"
        value={values.confirmPassword}
        onChange={handleChange('confirmPassword')}
        errorMsg={errors.confirmPassword}
        touched={touched.confirmPassword}
      />

      <Button text="Reset password" type="submit" isLoading={isPending} />
    </form>
  )
}
