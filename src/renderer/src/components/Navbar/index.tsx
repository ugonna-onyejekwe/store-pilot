import { deleteCookies, getCookies } from '@renderer/lib/utils'
import { RootState } from '@renderer/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AlertModal from '../ui/alertModal'
import Button from '../ui/Button'
import { Icons } from '../ui/icons'
import './styles.scss'

const Navbar = ({ setOpenSidebar, currentPage }: NavbarProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const [openLogout, setOpenLogout] = useState(false)
  const authCookie = getCookies('auth')

  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="page_name">
            <Icons.MenuIcon className="menu_icon" onclick={() => setOpenSidebar(true)} />

            <h1>{currentPage}</h1>
          </div>

          <div className="sec2">
            {/* Search section */}
            <div className="search_con">
              <Icons.SearchIcon className="search_icon" />

              <input type="search" placeholder="Search product by name..." />
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
            onOpenChange(false)
          }}
        />
      </div>
    </AlertModal>
  )
}
