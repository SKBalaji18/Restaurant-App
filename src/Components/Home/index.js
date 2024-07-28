import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CartContext from '../Context'
import FoodItem from '../FoodItem'
import './index.css'

import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    menuList: [],
    dishesList: [],
    activeTab: 'Salads and Soup',
    restData: [],
    cartList: [],
  }

  componentDidMount() {
    this.getFoods()
  }

  getFoods = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )

    if (response.ok) {
      const data = await response.json()
      const foodData = data[0]

      const menuTab = foodData.table_menu_list.map(each => ({
        id: each.menu_category_id,
        menuTab: each.menu_category,
      }))

      const {activeTab} = this.state

      const activeTabDishes = foodData.table_menu_list.filter(
        each => each.menu_category === activeTab,
      )

      const dishes = activeTabDishes[0].category_dishes.map(each => ({
        id: each.dish_id,
        dishName: each.dish_name,
        dishPrice: each.dish_price,
        dishImage: each.dish_image,
        dishCurrency: each.dish_currency,
        dishCalories: each.dish_calories,
        dishDescription: each.dish_description,
        dishAvailability: each.dish_Availability,
        dishType: each.dish_Type,
        nextUrl: each.nexturl,
        addonCat: each.addonCat,
        count: 0,
      }))

      this.setState({
        restData: foodData,
        menuList: menuTab,
        dishesList: dishes,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeTab = event => {
    this.setState({activeTab: event.target.value})
    this.getFoods()
  }

  foodTabs = () => {
    const {menuList, activeTab} = this.state

    return (
      <ul className="tabs">
        {menuList.map(each => (
          <li key={each.id}>
            <h1>
              <button
                type="button"
                onClick={this.onChangeTab}
                value={each.menuTab}
                className={
                  each.menuTab === activeTab ? 'active-btn' : 'normal-btn'
                }
              >
                {each.menuTab}
              </button>
            </h1>
          </li>
        ))}
      </ul>
    )
  }

  onAddDish = food => {
    const {dishesList, cartList} = this.state
    const findFood = dishesList.find(each => each.id === food.id)

    if (findFood) {
      this.setState(prev => ({
        dishesList: prev.dishesList.map(each => {
          if (each.id === findFood.id) {
            const updatedCount = each.count + 1
            return {...each, count: updatedCount}
          }
          return each
        }),
      }))
    }

    const addInCart = cartList.find(each => each === food.id)

    if (addInCart) {
      this.setState({cartList: [...cartList]})
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, food.id],
      }))
    }
  }

  onDelFood = food => {
    const {dishesList, cartList} = this.state
    const findFood = dishesList.find(each => each.id === food.id)

    if (findFood.count >= 1) {
      this.setState(prev => ({
        dishesList: prev.dishesList.map(each => {
          if (each.id === findFood.id) {
            const updatedCount = each.count - 1
            if (updatedCount <= 0) {
              const removeFoodItem = cartList.filter(
                eachItem => eachItem !== food.id,
              )
              this.setState({cartList: removeFoodItem})
            }
            return {...each, count: updatedCount}
          }
          return each
        }),
      }))
    } else {
      const removeFoodItem = cartList.filter(each => each !== food.id)
      this.setState({cartList: removeFoodItem})
    }
  }

  successView = () => {
    const {dishesList} = this.state

    return (
      <CartContext.Provider
        value={{
          incrementCartItemQuantity: this.onAddDish,
          decrementCartItemQuantity: this.onDelFood,
        }}
      >
        <ul className="food-li-container">
          {dishesList.map(eachItem => (
            <FoodItem foodData={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </CartContext.Provider>
    )
  }

  loaderView = () => (
    <div className="loaderView">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div>
      <h1>Page Not Found Try Again</h1>
      <button type="button" onClick={this.fetchApi}>
        Try Again
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    const {restData, menuList, cartList, dishesList, activeTab} = this.state

    console.log(restData)
    console.log(menuList)
    console.log(dishesList)
    console.log(activeTab)

    return (
      <div>
        <Navbar restData={restData} cartList={cartList} />
        {this.foodTabs()}
        {this.renderView()}
      </div>
    )
  }
}

export default Home
