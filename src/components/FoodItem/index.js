import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 0,
  }

  onClickAddButton = () => {
    this.setState({quantity: 1})
  }

  onDecrementQuantity = () => {
    this.setState(prevState => {
      const {quantity} = prevState
      if (quantity > 1) {
        return {quantity: quantity - 1}
      }

      return {quantity: 0}
    })
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderQuantityControllerCard = () => {
    const {quantity} = this.state

    return (
      <div className="food-item-quantity-control-card">
        <button
          type="button"
          className="food-item-quantity-control-button"
          onClick={this.onDecrementQuantity}
          data-testid="decrement-count"
        >
          -
        </button>
        <p className="food-item-quantity-count" data-testid="active-count">
          {quantity}
        </p>
        <button
          type="button"
          className="food-item-quantity-control-button"
          onClick={this.onIncrementQuantity}
          data-testid="decrement-count"
        >
          +
        </button>
      </div>
    )
  }

  render() {
    const {quantity} = this.state
    const {foodItemDetails} = this.props
    const {name, foodType, cost, imageUrl, id} = foodItemDetails

    return (
      <li className="food-item-container" data-testid="foodItem">
        <div className="food-item-image-card">
          <img className="food-item-image" src={imageUrl} alt="" />
        </div>
        <div className="food-item-details-card">
          <h1 className="food-item-name">{name}</h1>
          <div className="food-item-price-card">
            <BiRupee className="food-item-cost-icon" />
            <p className="food-item-cost">{cost}.00</p>
          </div>

          {quantity === 0 ? (
            <button
              className="add-food-item-button"
              onClick={this.onClickAddButton}
            >
              Add
            </button>
          ) : (
            this.renderQuantityControllerCard()
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
