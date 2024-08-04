import {useState, useContext} from 'react'
import './index.css'

import CartContext from '../../context/CartContext'

const FoodItem = props => {
  const {foodData} = props

  const [quantity, setQuantity] = useState(0)
  const {addItemToCart} = useContext(CartContext)

  const onAddFoodCart = () => {
    addItemToCart({...foodData, quantity})
  }

  const onIncreaseQuantity = () => setQuantity(prevState => prevState + 1)

  const onDecreaseQuantity = () =>
    setQuantity(prevState => (prevState > 0 ? prevState - 1 : 0))

  const controllerButton = () => (
    <div className="quan-btn">
      <button
        className="dec-btn"
        type="button"
        onClick={onDecreaseQuantity}
        id={foodData.dishId}
      >
        -
      </button>
      <p className="food-count">{quantity}</p>
      <button
        className="dec-btn"
        type="button"
        onClick={onIncreaseQuantity}
        id={foodData.dishId}
      >
        +
      </button>
    </div>
  )

  return (
    <li className="food-card">
      <div
        className={`type-width veg-border ${
          foodData.dishType === 1 ? 'non-veg-border' : ''
        } me-3`}
      >
        <div
          className={`veg-round ${
            foodData.dishType === 1 ? 'non-veg-round' : ''
          }`}
        />
      </div>
      <div className="food-details-container">
        <h1 className="food-name">{foodData.dishName}</h1>
        <p className="food-price">
          {foodData.dishCurrency} {foodData.dishPrice}
        </p>
        <p className="food-desc">{foodData.dishDescription}</p>
        {foodData.dishAvailability ? (
          controllerButton()
        ) : (
          <p className="na-err">Not Available</p>
        )}
        {foodData.addonCat.length > 0 && (
          <p className="cust-avail">Customizations available</p>
        )}
        {quantity > 0 && (
          <button type="button" className="cart-btn" onClick={onAddFoodCart}>
            ADD TO CART
          </button>
        )}
      </div>
      <div className="end-cont">
        <p className="calories">{foodData.dishCalories} calories</p>
      </div>
      <div className="food-pic-cont">
        <img
          className="food-pic"
          src={foodData.dishImage}
          alt={foodData.dishId}
        />
      </div>
    </li>
  )
}

export default FoodItem
