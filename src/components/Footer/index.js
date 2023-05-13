import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg-container">
      <div className="footer-website-logo-card">
        <img
          className="footer-website-logo"
          src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683487379/Tasty%20Kitchens%20Project/Footer/Vector_uak3qn.svg"
          alt="website-footer-logo"
        />
        <h1 className="footer-website-name">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="social-icons-card">
        <FaPinterestSquare
          className="social-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="social-icon" testid="instagram-social-icon" />
        <FaTwitter className="social-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
