import {createContext} from 'react'

const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
