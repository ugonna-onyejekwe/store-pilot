import ResetPasswordForm from '../forms/resetPasswordForm'
import AlertModal from '../ui/alertModal'
import './styles.scss'

const AuthModal = ({
  open,
  setOnOPenChange
}: {
  open: boolean
  setOnOPenChange: (value: boolean) => void
}) => {
  return (
    <AlertModal open={open} onOpenChange={setOnOPenChange} className="admin_auth_form">
      {<ResetPasswordForm forgottenPassword={false} setOpenModel={setOnOPenChange} />}
    </AlertModal>
  )
}

export default AuthModal
