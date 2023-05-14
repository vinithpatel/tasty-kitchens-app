import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const Restaurant = props => {
  const {restaurantDetails} = props
  const {imageUrl, id, name, userRating, cuisine} = restaurantDetails
  const {rating, totalReviews} = userRating

  const path = `/restaurant/${id}`

  return (
    <Link to={path} className="restaurant-link">
      <li className="restaurant-bg-container" data-testid="restaurant-item">
        <div className="restaurant-img-card">
          <img className="restaurant-img" src={imageUrl} alt="restaurant" />
        </div>
        <div className="restaurant-info-card">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine-type">{cuisine}</p>
          <div className="restaurant-rating-card">
            <AiFillStar className="restaurant-rating-star-icon" />
            <p className="restaurant-rating">{rating}</p>
            <span className="restaurant-total-ratings">({totalReviews})</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default Restaurant
