import { deleteCookies } from '@renderer/lib/utils'
import { RootState } from '@renderer/store'
import { removeCookie } from '@renderer/store/authSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Icons } from '../ui/icons'
import './styles.scss'

const Navbar = ({ currentPage, isDashboard = false }: NavbarProps) => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)
  const [openLogout, setOpenLogout] = useState(false)
  const authCookie = useSelector((state: RootState) => state.authReducer.cookie)
  const [searchValue, setSearchValue] = useState('')
  const [_, setSearchParams] = useSearchParams()

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchParams({ seacrhValue: searchValue })
    }
  }

  useEffect(() => {
    if (searchValue === '') {
      setSearchParams({ seacrhValue: '' })
    }
  }, [searchValue])

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="page_name">
            {!isDashboard && (
              <Link to={'/'} className="back_btn">
                <Icons.BackArrow className="back_icon" />
              </Link>
            )}

            <h1>{currentPage}</h1>
          </div>

          <div className="sec2">
            {/* Search section */}
            <div className="search_con">
              <Icons.SearchIcon className="search_icon" />

              <input
                type="search"
                placeholder="Search product by name..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>

            {/* Shopping cart */}
            <Link to="/cart" className="shopping_cart">
              <Icons.ShoopingCart className="shopping_cart_icon" />

              <span>{cartItems.length}</span>
            </Link>

            {/* Logout */}
            {authCookie && (
              <span className="logout" onClick={() => setOpenLogout(true)}>
                <Icons.LogoutIcon className="logout_icon" />
              </span>
            )}
          </div>
        </div>
      </div>

      <LogoutModel onOpenChange={setOpenLogout} open={openLogout} />
    </>
  )
}

export default Navbar

const LogoutModel = ({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) => {
  const dispatch = useDispatch()
  return (
    <AlertModal open={open} onOpenChange={onOpenChange} className="logout_model">
      <h2>Do you want to logout of admin?</h2>
      <p>Admin is still logged in, please logout if you are not using admin.</p>

      <div className="btns">
        <Button text="Cancel" varient="outline" />
        <Button
          text="Logout"
          onClick={() => {
            deleteCookies('auth')
            dispatch(removeCookie())
            onOpenChange(false)
          }}
        />
      </div>
    </AlertModal>
  )
}
