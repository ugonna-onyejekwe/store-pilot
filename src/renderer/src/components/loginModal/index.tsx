import { useFormik } from 'formik'
import { useState } from 'react'
import Bot from '../bot'
import { LoginSchema } from '../forms/schemas'
import { Input } from '../inputs'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Icons } from '../ui/icons'
import './styles.scss'

type LoginModalProps = {
  onOpen: boolean
  onOpenChange: (value: boolean) => void
  sessionExpired: boolean
}

const LoginModal = ({ onOpen, onOpenChange, sessionExpired }: LoginModalProps) => {
  const [isSuccessful, setSuccessful] = useState(false)
  const onSubmit = () => {}

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: { password: '' },
    validationSchema: LoginSchema,
    onSubmit
  })

  return (
    <>
      <AlertModal open={onOpen} onOpenChange={onOpenChange} isCloseable={false}>
        <>
          <Bot />

          {!isSuccessful && (
            <div className="loginModal_con">
              <h2>Login</h2>
              {sessionExpired ? (
                <p className="txt">Looks like your login session has expired. Please login again</p>
              ) : (
                <p className="txt">Enter your details to login</p>
              )}

              <form onSubmit={handleSubmit}>
                <Input
                  value={values.password}
                  onChange={handleChange('password')}
                  touched={touched.password}
                  errorMsg={errors.password}
                  placeholder="Enter password"
                  type="password"
                />

                <Button text="Login" />
              </form>
            </div>
          )}

          {isSuccessful && (
            <div className="successful_con">
              <Icons.CheckIcon className="check_icon" />

              <h3>Login successful</h3>
            </div>
          )}
        </>
      </AlertModal>
    </>
  )
}

export default LoginModal
