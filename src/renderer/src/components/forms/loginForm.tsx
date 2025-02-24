import { useLogin } from '@renderer/apis/auth/login'
import { getError, setCookies } from '@renderer/lib/utils'
import { initCookie } from '@renderer/store/authSlice'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Input } from '../inputs'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import { LoginSchema } from './schemas'

type LoginFormProps = {
  setLoggingIn: (value: boolean) => void
  openModel: (value: boolean) => void
}

const LoginForm = ({ setLoggingIn, openModel }: LoginFormProps) => {
  const { isPending, mutateAsync } = useLogin()
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    mutateAsync({ password: values.password })
      .then(() => {
        toastUI.success('Login successful')
        openModel(false)
        setCookies('auth', 'LOGGED_IN')
        dispatch(initCookie())
        resetForm()
      })
      .catch((error) => toastUI.error(getError(error)))
  }

  const { values, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit
  })

  return (
    <div className="login_form">
      <h2>Login</h2>
      {<p className="subheader">Enter your details to login</p>}

      <form onSubmit={handleSubmit}>
        <Input
          value={values.password}
          onChange={handleChange('password')}
          touched={touched.password}
          errorMsg={errors.password}
          placeholder="Enter password"
          type="password"
        />

        <span className="forgottenPassword" onClick={() => setLoggingIn(false)}>
          Forgotten password?
        </span>

        <Button text="Login" type="submit" isLoading={isPending} />
      </form>
    </div>
  )
}

export default LoginForm
