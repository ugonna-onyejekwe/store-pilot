import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icons } from '../ui/icons'
import './styles.scss'

const Navbar = ({ setOpenSidebar, currentPage }: NavbarProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  return (
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
        </div>
      </div>
    </div>
  )
}

export default Navbar
