import LoginModal from '@renderer/components/loginModal'
import { getCookies } from '@renderer/lib/utils'
import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const params = useParams()

  useEffect(() => {
    const cookie = getCookies('auth')
    if (!cookie) return setOpenLoginModal(true)
  }, [params])

  return (
    <>
      <LoginModal onOpen={openLoginModal} onOpenChange={setOpenLoginModal} />

      <div>{children}</div>
    </>
  )
}

export default AuthProvider
