import CartItem from '@renderer/components/CartItem'
import CheckOutForm from '@renderer/components/CheckOutForm'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import './styles.scss'

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  return (
    <div className="cart_page container">
      <div className="cart_container">
        <h2>Cart </h2>
        <div className="cart_items">
          {cartItems.map((i, key) => (
            <CartItem key={key} {...i} />
          ))}
        </div>
      </div>
      <div className="checkout_container">
        <h2>Checkout form</h2>
        <p className="subheader">Enter details to checkout</p>

        <CheckOutForm />
      </div>
    </div>
  )
}

export default Cart
