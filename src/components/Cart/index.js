import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  emptyView: 'EMPTY',
  cartItemsView: 'CART_ITEMS-VIEW',
  orderPlaced: 'ORDER_PLACED',
}

class Cart extends Component {
  state = {
    cartStatus: cartStatusConstants.initial,
    cartItems: [],
  }

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = () => {
    const parsedCartData = this.getLocalStorageData()
    if (parsedCartData.length === 0) {
      this.setState({cartStatus: cartStatusConstants.emptyView})
    } else {
      this.setState({
        cartStatus: cartStatusConstants.cartItemsView,
        cartItems: parsedCartData,
      })
    }
  }

  getLocalStorageData = () => {
    const cartData = localStorage.getItem('cartData')
    if (cartData !== null) {
      return JSON.parse(cartData)
    }

    return []
  }

  getTotalCost = () => {
    const {cartItems} = this.state

    let totalCost = 0

    cartItems.forEach(eachItem => {
      totalCost += eachItem.quantity * eachItem.cost
    })

    return totalCost
  }

  decreaseQuantity = (id, quantity) => {
    const {cartItems} = this.state

    let updatedCartData
    if (quantity > 1) {
      updatedCartData = cartItems.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity - 1,
          }
        }
        return eachItem
      })
    } else {
      updatedCartData = cartItems.filter(eachItem => eachItem.id !== id)
    }

    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartItems()
  }

  increaseQuantity = id => {
    const {cartItems} = this.state
    const updatedCartData = cartItems.map(eachItem => {
      if (eachItem.id === id) {
        return {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartItems()
  }

  getCartResources = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartStatusConstants.emptyView:
        return this.renderCartEmptyView()
      case cartStatusConstants.cartItemsView:
        return this.renderCartItemsView()
      case cartStatusConstants.orderPlaced:
        return this.renderOrderPlacedView()
      default:
        return this.renderLoader()
    }
  }

  renderLoader = () => (
    <div className="offers-loader">
      <Loader type="TailSpin" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCartItemsView = () => {
    const {cartItems} = this.state

    return (
      <div className="cart-items-view-bg-container">
        <div className="cart-items-container">
          <div className="cart-items-headings-card">
            <h1 className="cart-item-heading">Item</h1>
            <h1 className="cart-item-heading">Quantity</h1>
            <h1 className="cart-item-heading">Price</h1>
          </div>
          <ul className="list-of-cart-items">
            {cartItems.map(eachItem => (
              <CartItem
                key={eachItem.id}
                cartItemDetails={eachItem}
                decreaseQuantity={this.decreaseQuantity}
                increaseQuantity={this.increaseQuantity}
              />
            ))}
          </ul>
          <hr className="cart-horizental-rule" />
          <div className="order-summary-card">
            <h1 className="order-total-heading">Order Total :</h1>
            <div className="cart-total-price-card">
              <div className="cart-price-card">
                <BiRupee className="total-cost-icon" />
                <p className="total-cost">{this.getTotalCost()}.00</p>
              </div>
              <button className="place-order-button">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <>
        <Header activePage="Cart" />
        <div className="cart-bg-container">
          {!isOrderPlaced && this.getCartResources()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Cart
