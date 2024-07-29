import './index.css'

const FoodItem = props => {
  const {foodData, cartList, addItem, removeItem} = props

  const onAddFood = () => {
    addItem(foodData)
  }

  const onDecFood = () => {
    removeItem(foodData)
  }

  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === foodData.dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const controllerButton = () => (
    <div className="quan-btn">
      <button
        className="dec-btn"
        type="button"
        onClick={onDecFood}
        id={foodData.dishId}
      >
        -
      </button>
      <p className="food-count">{getQuantity()}</p>
      <button
        className="dec-btn"
        type="button"
        onClick={onAddFood}
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
