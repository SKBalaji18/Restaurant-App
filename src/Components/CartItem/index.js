import {useContext} from 'react'

import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext)

  const {cartItemDetails} = props

  const {
    dishId,
    dishName,
    dishImage,
    quantity,
    dishCurrency,
    dishPrice,
  } = cartItemDetails

  const onIncrement = () => incrementCartItemQuantity(dishId)

  const onDecrement = () => decrementCartItemQuantity(dishId)

  const onRemoveCartItem = () => removeCartItem(dishId)

  return (
    <li className="cart-item">
      <img className="cart-product-image" src={dishImage} alt={dishName} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dishName}</p>
        </div>
        <div className="cart-quantity-container">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            onClick={onDecrement}
            data-testid="minus"
            className="quantity-controller-button"
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          {/* eslint-disable-next-line */}
          <button
            type="button"
            onClick={onIncrement}
            data-testid="plus"
            className="quantity-controller-button"
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dishCurrency} {(quantity * dishPrice).toFixed(2)}/-
          </p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      {/* eslint-disable-next-line */}
      <button
        className="delete-button"
        type="button"
        data-testid="remove"
        onClick={onRemoveCartItem}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
