import LoginModal from '@renderer/components/loginModal'
import { ReactNode, useState } from 'react'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)

  return (
    <>
      <LoginModal
        onOpen={openLoginModal}
        onOpenChange={setOpenLoginModal}
        sessionExpired={sessionExpired}
      />

      <div>{children}</div>
    </>
  )
}

export default AuthProvider
