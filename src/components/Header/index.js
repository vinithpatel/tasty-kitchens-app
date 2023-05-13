import {Component} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'
import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    isMenuOpen: false,
  }

  onHamburgerClicked = () => {
    this.setState({isMenuOpen: true})
  }

  onCancelMenuClicked = () => {
    this.setState({isMenuOpen: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  render() {
    const {isMenuOpen} = this.state
    const {activePage} = this.props

    const activeHomeLinkClassName = activePage === 'Home' ? 'active-link' : ''
    const activeCartLinkClassName = activePage === 'Cart' ? 'active-link' : ''

    return (
      <nav className="nav-bar">
        <div className="nav-bar-tablet-view-card">
          <Link to="/" className="nav-link">
            <div className="nav-bar-logo-card">
              <img
                className="nav-bar-website-logo"
                src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683008735/Tasty%20Kitchens%20Project/login/Frame_274_xmelsd.jpg"
                alt="website logo"
              />
              <h1 className="nav-bar-website-name">Tasty Kitchens</h1>
            </div>
          </Link>
          <div className="mobile-hamburger-icon-card">
            <button
              type="button"
              className="menu-toggle-button"
              onClick={this.onHamburgerClicked}
            >
              <GiHamburgerMenu className="nav-bar-hamburger-menu" />
            </button>
          </div>

          <div className="nav-links-tablet-card">
            <Link to="/" className={`nav-link ${activeHomeLinkClassName}`}>
              <p className="nav-link-para">Home</p>
            </Link>
            <Link to="/cart" className={`nav-link ${activeCartLinkClassName}`}>
              <p className="nav-link-para">Cart</p>
            </Link>
            <button
              className="nav-bar-logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="nav-bar-mobile-links-card">
            <div className="nav-links-card">
              <Link to="/" className={`nav-link ${activeHomeLinkClassName}`}>
                <p className="nav-link-para">Home</p>
              </Link>
              <Link
                to="/cart"
                className={`nav-link ${activeCartLinkClassName}`}
              >
                <p className="nav-link-para">Cart</p>
              </Link>
              <button
                className="nav-bar-logout-button"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
            <button
              type="button"
              className="menu-toggle-button"
              onClick={this.onCancelMenuClicked}
            >
              <MdCancel className="nav-bar-hamburger-menu " />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
