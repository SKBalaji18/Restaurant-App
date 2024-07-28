import CartContext from '../Context'
import './index.css'

const FoodItem = props => {
  const {foodData} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {incrementCartItemQuantity, decrementCartItemQuantity} = value

        const onAddFood = () => {
          incrementCartItemQuantity(foodData)
        }

        const onDecFood = () => {
          decrementCartItemQuantity(foodData)
        }
        return (
          <li className="food-card">
            <div className="food-details-container">
              <h1 className="food-name">{foodData.dishName}</h1>
              <p className="food-price">
                {foodData.dishCurrency} {foodData.dishPrice}
              </p>
              <p className="food-desc">{foodData.dishDescription}</p>
              {foodData.dishAvailability ? (
                <div className="quan-btn">
                  <button className="dec-btn" type="button" onClick={onDecFood}>
                    -
                  </button>
                  <p className="food-count">{foodData.count}</p>
                  <button className="dec-btn" type="button" onClick={onAddFood}>
                    +
                  </button>
                </div>
              ) : (
                <p className="na-err">Not Available</p>
              )}
              {foodData.addonCat.length > 0 && (
                <p className="cust-avail">Customizations available</p>
              )}
            </div>
            <div>
              <p className="calories">{foodData.dishCalories} calories</p>
            </div>
            <div className="food-pic-cont">
              <img
                className="food-pic"
                src={foodData.dishImage}
                alt={foodData.id}
              />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
