import {useState, useEffect, useContext} from 'react'

import Navbar from '../Navbar'
import FoodItem from '../FoodItem'

import CartContext from '../../context/CartContext'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [menuTabs, setMenuTab] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {cartItems} = useContext(CartContext)

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(each => ({
      menuCategoryId: each.menu_category_id,
      categoryDishes: each.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    console.log(data)
    const details = data[0].table_menu_list.map(each => ({
      menuCategoryId: each.menu_category_id,
      menuCategory: each.menu_category,
    }))

    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponse(updatedData)
    setMenuTab(details)
    console.log(updatedData)
    console.log(details)
    setActiveCategoryId(details[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUpdateActiveCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    menuTabs.map(eachCategory => {
      const onClickHandler = () =>
        onUpdateActiveCategoryId(eachCategory.menuCategoryId)

      return (
        <li key={eachCategory.menuCategoryId}>
          <button
            type="button"
            onClick={onClickHandler}
            value={eachCategory.menuCategoryId}
            className={
              eachCategory.menuCategoryId === activeCategoryId
                ? 'active-btn'
                : 'normal-btn'
            }
          >
            {eachCategory.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="food-li-container">
        {categoryDishes.map(eachDish => (
          <FoodItem key={eachDish.dishId} foodData={eachDish} />
        ))}
      </ul>
    )
  }

  const renderSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderSpinner()
  ) : (
    <div>
      <Navbar cartList={cartItems} />
      <ul className="tabs">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
