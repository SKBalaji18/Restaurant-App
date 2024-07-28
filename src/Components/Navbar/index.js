import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Navbar = props => {
  const {restData, cartList} = props

  return (
    <nav>
      <h1 className="rest-name">{restData.restaurant_name}</h1>
      <div className="nav-right">
        <p className="nav-ord-let">My Orders</p>
        <div className="cart">
          <span className="cart-counter">{cartList.length}</span>
          <div className="cart-logo">
            <AiOutlineShoppingCart className="logo" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
