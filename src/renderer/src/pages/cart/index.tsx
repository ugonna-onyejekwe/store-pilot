import CartItem from '@renderer/components/CartItem'
import CheckOutForm from '@renderer/components/CheckOutForm'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import emptycart from '../../assets/images/cart.webp'
import './styles.scss'

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.cartItems)

  return (
    <div className="cart_page container">
      <div className="cart_container">
        {cartItems.length !== 0 && <h2>Cart </h2>}
        {cartItems.length === 0 ? (
          <div className="empty_cart">
            <img src={emptycart} alt="Empty cart" />

            <h2>Cart is empty.</h2>
          </div>
        ) : (
          <div className="cart_items">
            {cartItems.map((i, key) => (
              <CartItem key={key} {...i} index={key} />
            ))}
          </div>
        )}
      </div>
      {cartItems.length !== 0 && (
        <div className="checkout_container">
          <h2>Checkout form</h2>
          <p className="subheader">Enter details to checkout</p>

          <CheckOutForm />
        </div>
      )}
    </div>
  )
}

export default Cart
