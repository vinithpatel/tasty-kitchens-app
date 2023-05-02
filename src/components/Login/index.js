import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isUserValid: true,
    errorMsg: '',
    isLoginProgress: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfullLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isUserValid: true, isLoginProgress: false})

    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isUserValid: false, errorMsg, isLoginProgress: false})
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    this.setState({isLoginProgress: true})

    const userDetails = {
      username,
      password,
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfullLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" height={20} width={30} color="#475569" />
    </div>
  )

  render() {
    const {
      username,
      password,
      isUserValid,
      errorMsg,
      isLoginProgress,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-mobile-landing-img-container">
          <h1 className="login-mobile-heading">Login</h1>
          <img
            className="login-mobile-landing-img"
            src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683006403/Tasty%20Kitchens%20Project/login/Rectangle_1457_yjygcp.jpg"
            alt="website login"
          />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onClickLogin}>
            <div className="login-form-tablet-view-card">
              <div className="login-form-website-logo-card">
                <img
                  className="login-form-website-logo"
                  src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683008735/Tasty%20Kitchens%20Project/login/Frame_274_xmelsd.jpg"
                  alt="website logo"
                />
                <h1 className="login-form-website-name">Tasty Kitchens</h1>
              </div>
              <h1 className="login-tablet-heading">Login</h1>
            </div>
            <div className="user-input-container">
              <label className="user-input-label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="user-input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="user-input-container">
              <label className="user-input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="user-input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            {!isUserValid && <p className="login-error-msg">{errorMsg}</p>}
            <div className="login-button-container">
              {isLoginProgress ? (
                this.renderLoader()
              ) : (
                <button type="submit" className="login-button">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="login-tablet-landing-img-container">
          <img
            className="login-tablet-landing-img"
            src="https://res.cloudinary.com/dlddaunc2/image/upload/v1683006267/Tasty%20Kitchens%20Project/login/Rectangle_1456_yv9ram.jpg"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default Login
