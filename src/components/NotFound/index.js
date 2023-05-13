import {Link} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const {history} = props

  return (
    <div className="not-found-bg-container">
      <div className="not-found-container">
        <img
          className="not-found-img"
          src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683966250/Tasty%20Kitchens%20Project/NotFound/erroring_1_azfodc.jpg"
          alt="not found"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-para">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <Link to="/">
          <button type="button" className="home-page-button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
