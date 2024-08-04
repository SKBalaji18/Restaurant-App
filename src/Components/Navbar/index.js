import {useContext} from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

const Navbar = props => {
  const {cartItems} = useContext(CartContext)

  /* const getCartItemsCount = () =>
    cartList.reduce((acc, item) => acc + item.quantity, 0)
  */

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <Link to="/" className="nav-head-link">
        <h1 className="rest-name">UNI Resto Cafe</h1>
      </Link>
      <div className="nav-right">
        <p className="nav-ord-let">My Orders</p>
        <div className="cart-icon-container">
          <Link to="/cart">
            <button
              type="button"
              className="cart-icon-button"
              data-testid="cart"
            >
              <AiOutlineShoppingCart className="cart-icon" />
            </button>

            <div className="cart-count-badge d-flex justify-content-center align-items-center">
              <p className="m-0 cart-count">{cartItems.length}</p>
            </div>
          </Link>
        </div>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
        {/*
        <div className="cart">
          <p className="cart-counter">{cartList.length}</p>
          <div className="cart-logo">
            <AiOutlineShoppingCart className="logo" />
          </div>
        </div>
        ) */}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
