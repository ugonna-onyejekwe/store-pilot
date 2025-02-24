import LoginModal from '@renderer/components/loginModal'
import { RootState } from '@renderer/store'
import { initCookie } from '@renderer/store/authSlice'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const cookie = useSelector((state: RootState) => state.authReducer.cookie)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initCookie())
    if (!cookie) setOpenLoginModal(true)
  }, [cookie])

  return (
    <>
      <LoginModal onOpen={openLoginModal} onOpenChange={setOpenLoginModal} />

      <div>{children}</div>
    </>
  )
}

export default AuthProvider
