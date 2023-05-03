import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class Home extends Component {
  state = {
    offersApiStatus: apiStatusConstants.initail,
    restaurantsApiStatus: apiStatusConstants.initail,
    offersList: [],
    restaurantsList: [],
  }

  componentDidMount() {
    this.getOffersList()
  }

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
    }
  }

  getOffers = () => {
    const {offersApiStatus} = this.state

    switch (offersApiStatus) {
      case apiStatusConstants.progress:
        return this.renderOffersLoader()
      case apiStatusConstants.success:
        return this.renderOffersCarousel()
      default:
        return null
    }
  }

  getRestaurantsList = () => {
    const {restaurantsApiStatus} = this.state
    return null
  }

  renderOffersLoader = () => (
    <div className="offers-loader" data-testid="restaurants-offers-loader">
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
        \
      </div>
    )
  }

  render() {
    return (
      <>
        <Header activePage="Home" />
        <div className="home-bg-container">
          {this.getOffers()}
          {this.getRestaurantsList()}
        </div>
      </>
    )
  }
}

export default Home
