import {useContext} from 'react'
import {Link} from 'react-router-dom'

import Navbar from '../Navbar'
import CartItem from '../CartItem'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const {cartItems, removeAllCartItems} = useContext(CartContext)

  const onRemoveAllItem = () => removeAllCartItems()

  console.log(cartItems)

  const renderEmptyView = () => (
    <div className="cart-empty-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="cart-empty-img"
      />
      <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
      <Link to="/">
        <button type="button" className="shop-now-btn">
          Shop Now
        </button>
      </Link>
    </div>
  )

  const renderCartView = () => (
    <div className="cart-content-container">
      <h1 className="cart-heading">My Cart</h1>
      <button
        onClick={onRemoveAllItem}
        type="button"
        className="remove-all-btn"
      >
        Remove All
      </button>
      <ul className="cart-list">
        {cartItems.map(each => (
          <CartItem key={each.dishId} cartItemDetails={each} />
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {cartItems.length === 0 ? renderEmptyView() : renderCartView()}
      </div>
    </>
  )
}

export default Cart
