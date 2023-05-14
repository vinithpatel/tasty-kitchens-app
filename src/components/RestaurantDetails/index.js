import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetailsApiStatus: apiStatusConstants.initial,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getCamelCaseData = array =>
    array.map(eachObject => ({
      name: eachObject.name,
      cost: eachObject.cost,
      foodType: eachObject.food_type,
      imageUrl: eachObject.image_url,
      id: eachObject.id,
    }))

  getRestaurantData = async () => {
    this.setState({restaurantDetailsApiStatus: apiStatusConstants.progress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const camelCaseData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: this.getCamelCaseData(data.food_items),
      }

      console.log(camelCaseData)

      this.setState({
        restaurantDetailsApiStatus: apiStatusConstants.success,
        restaurantDetails: camelCaseData,
      })
    }
  }

  renderLoader = () => (
    <div className="offers-loader" data-testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  getRestaurantsDetails = () => {
    const {restaurantDetailsApiStatus} = this.state

    switch (restaurantDetailsApiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantDetails()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="offers-loader" data-testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantDetails} = this.state
    const {
      rating,
      name,
      costForTwo,
      cuisine,
      imageUrl,
      reviewsCount,

      location,

      foodItems,
    } = restaurantDetails

    return (
      <>
        <div className="restaurant-details-card">
          <div className="restaurant-image-card">
            <img className="restaurant-image" src={imageUrl} alt="restaurant" />
          </div>
          <div className="restaurant-details-info-card">
            <h1 className="restaurant-details-name">{name}</h1>
            <p className="restaurant-cuisine">{cuisine}</p>
            <p className="restaurant-location">{location}</p>
            <div className="restaurant-rating-price-card">
              <div className="restaurant-rating-bg-card">
                <div className="restaurant-details-rating-card">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
                <p className="restaurant-details-reviews-count">
                  {reviewsCount} Ratings
                </p>
              </div>

              <div className="restaurant-rating-bg-card">
                <div className="restaurant-details-rating-card">
                  <BiRupee className="star-icon" />
                  <p className="rating">{costForTwo}</p>
                </div>
                <p className="restaurant-details-reviews-count">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <div className="food-items-container">
          <ul className="list-of-food-items">
            {foodItems.map(eachObj => (
              <FoodItem key={eachObj.id} foodItemDetails={eachObj} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <Header activePage="Home" />
        <div className="restaurant-details-bg-container">
          {this.getRestaurantsDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
