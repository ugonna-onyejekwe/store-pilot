import { useState } from 'react'
import { Link } from 'react-router-dom'
import Bot from '../bot'
import LoginForm from '../forms/loginForm'
import ResetPasswordForm from '../forms/resetPasswordForm'
import AlertModal from '../ui/alertModal'
import { Icons } from '../ui/icons'
import './styles.scss'

type LoginModalProps = {
  onOpen: boolean
  onOpenChange: (value: boolean) => void
}

const LoginModal = ({ onOpen, onOpenChange }: LoginModalProps) => {
  const [loggingIn, setLoggingIn] = useState(true)

  return (
    <>
      <AlertModal
        open={onOpen}
        onOpenChange={onOpenChange}
        isCloseable={false}
        className="loginModal_con"
      >
        <Link to={'/'} className="back_arrow">
          <Icons.BackArrow className="back_icon" />
        </Link>

        <>
          <div className="bot_con">
            <Bot />
          </div>

          {loggingIn && <LoginForm setLoggingIn={setLoggingIn} openModel={onOpenChange} />}

          {!loggingIn && <ResetPasswordForm setLoggingIn={setLoggingIn} />}
        </>
      </AlertModal>
    </>
  )
}

export default LoginModal
