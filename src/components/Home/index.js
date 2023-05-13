import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsFilterLeft, BsSearch} from 'react-icons/bs'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import Header from '../Header'
import Restaurant from '../Restaurant'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAIL',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersApiStatus: apiStatusConstants.initail,
    restaurantsApiStatus: apiStatusConstants.initail,
    offersList: [],
    restaurantsList: {},
    searchInput: '',
    sortByOption: sortByOptions[1].value,
    activePageNumber: 1,
  }

  componentDidMount() {
    this.getOffersList()
    this.getRestaurantsList()
  }

  getCamelCaseData = array =>
    array.map(eachObject => ({
      hasOnlineDelivery: eachObject.has_online_delivery,
      userRating: {
        ratingText: eachObject.user_rating.rating_text,
        ratingColor: eachObject.user_rating.rating_color,
        totalReviews: eachObject.user_rating.total_reviews,
        rating: eachObject.user_rating.rating,
      },
      name: eachObject.name,
      hasTableBooking: eachObject.has_table_booking,
      isDeliveringNow: eachObject.is_delivering_now,
      costForTwo: eachObject.cost_for_two,
      cuisine: eachObject.cuisine,
      imageUrl: eachObject.image_url,
      id: eachObject.id,
      menuType: eachObject.menu_type,
      location: eachObject.location,
      opensAt: eachObject.opens_at,
      groupByTime: eachObject.group_by_time,
    }))

  getOffersList = async () => {
    this.setState({offersApiStatus: apiStatusConstants.progress})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )

    if (response.ok) {
      const data = await response.json()
      this.setState({
        offersApiStatus: apiStatusConstants.success,
        offersList: data.offers,
      })
    } else {
      this.setState({offersApiStatus: apiStatusConstants.failure})
    }
  }

  getRestaurantsList = async () => {
    this.setState({restaurantsApiStatus: apiStatusConstants.progress})
    const {searchInput, sortByOption, activePageNumber} = this.state

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const offset = (activePageNumber - 1) * 9

    const getRestaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}&sort_by_rating=${sortByOption}&search=${searchInput}`

    const response = await fetch(getRestaurantsApiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const camelCaseData = {
        restaurants: this.getCamelCaseData(data.restaurants),
        total: data.total,
      }

      console.log(camelCaseData)

      this.setState({
        restaurantsApiStatus: apiStatusConstants.success,
        restaurantsList: camelCaseData,
      })
    }
  }

  onClickRetryButton = () => {
    this.getOffersList()
  }

  onChangeSortByOption = event => {
    this.setState(
      {sortByOption: event.target.value, activePageNumber: 1},
      this.getRestaurantsList,
    )
  }

  onClickSearchButton = () => {
    this.getRestaurantsList()
  }

  onChangeSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickLeftPagination = () => {
    this.setState(prevState => {
      const {activePageNumber} = prevState
      if (activePageNumber > 1) {
        return {activePageNumber: activePageNumber - 1}
      }
      return prevState
    }, this.getRestaurantsList)
  }

  onClickRightPagination = () => {
    this.setState(prevState => {
      const {activePageNumber, restaurantsList} = prevState
      const {total} = restaurantsList
      if (activePageNumber < Math.ceil(total / 9)) {
        return {activePageNumber: activePageNumber + 1}
      }

      return prevState
    }, this.getRestaurantsList)
  }

  getOffers = () => {
    const {offersApiStatus} = this.state

    switch (offersApiStatus) {
      case apiStatusConstants.progress:
        return this.renderOffersLoader()
      case apiStatusConstants.success:
        return this.renderOffersCarousel()
      case apiStatusConstants.failure:
        return this.renderOffersFailure()
      default:
        return null
    }
  }

  getRestaurants = () => {
    const {restaurantsApiStatus} = this.state
    switch (restaurantsApiStatus) {
      case apiStatusConstants.progress:
        return this.renderRestaurentListLoader()
      case apiStatusConstants.success:
        return this.renderRestaurants()
      default:
        return null
    }
  }

  renderOffersLoader = () => (
    <div className="offers-loader" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderOffersCarousel = () => {
    const {offersList} = this.state

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {offersList.map(eachOffer => (
            <div key={eachOffer.id} className="offer-card">
              <img
                className="offer-image"
                src={eachOffer.image_url}
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderOffersFailure = () => (
    <div className="offers-failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderRestaurentListLoader = () => (
    <div className="offers-loader" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderPopularRestaurants = () => {
    const {restaurantsList} = this.state
    const {restaurants} = restaurantsList
    return (
      <div className="popular-restaurants-bg-container">
        <ul className="popular-restaurants-list">
          {restaurants.map(eachRestaurant => (
            <Restaurant
              key={eachRestaurant.id}
              restaurantDetails={eachRestaurant}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRestaurants = () => {
    const {
      restaurantsList,
      sortByOption,
      activePageNumber,
      searchInput,
    } = this.state
    const {total} = restaurantsList

    return (
      <div className="restaurants-bg-container">
        <div className="popular-restaurants-heading-container">
          <h1 className="Popular-restaurants-heading">Popular Restaurants</h1>
          <p className="popular-restaurants-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="popular-restaurants-top-container">
          <div className="search-input-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search For Restaurants"
              value={searchInput}
              onChange={this.onChangeSearchValue}
            />
            <button
              className="search-button"
              type="button"
              onClick={this.onClickSearchButton}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="sort-by-filter-card">
            <BsFilterLeft className="filter-icon" />
            <p>Sort by</p>
            <select
              className="sort-by-filter"
              value={sortByOption}
              onChange={this.onChangeSortByOption}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} value={eachOption.value}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>

        {this.renderPopularRestaurants()}
        <div className="pagination-container">
          <button
            className="pagination-button"
            testid="pagination-left-button"
            onClick={this.onClickLeftPagination}
            disabled={activePageNumber === 1}
            type="button"
          >
            <AiOutlineLeft />
          </button>
          <p className="pagination-para">
            <span testid="active-page-number">{activePageNumber}</span> of{' '}
            {Math.ceil(total / 9)}
          </p>
          <button
            className="pagination-button"
            testid="pagination-right-button"
            onClick={this.onClickRightPagination}
            disabled={activePageNumber > total / 9}
            type="button"
          >
            <AiOutlineRight />
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header activePage="Home" />
        <div className="home-bg-container">
          {this.getOffers()}
          {this.getRestaurants()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
