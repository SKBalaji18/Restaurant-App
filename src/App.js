import {Switch, Route, Redirect} from 'react-router-dom'

import {useState} from 'react'

import './App.css'
import Home from './Components/Home'

import Cart from './Components/Cart'
import NotFound from './Components/NotFound'

import ProtectedRoute from './Components/ProtectedRoute'
import LoginForm from './Components/LoginForm'

import CartContext from './context/CartContext'

const App = () => {
  const [cartItems, setCartItems] = useState([])

  console.log(cartItems)

  const addItemToCart = dish => {
    const isAlreadyExists = cartItems.find(item => item.dishId === dish.dishId)
    if (!isAlreadyExists) {
      setCartItems(prev => [...prev, dish])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const incrementCartItemQuantity = dishId => {
    setCartItems(prev =>
      prev.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const removeCartItem = dishId => {
    setCartItems(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartItems([])

  const decrementCartItemQuantity = dishId => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}
export default App
