import {BiRupee} from 'react-icons/bi'
import './index.css'

const CartItem = props => {
  const {cartItemDetails, decreaseQuantity, increaseQuantity} = props
  const {cost, quantity, id, imageUrl, name} = cartItemDetails

  const onDecrementQuantity = () => {
    decreaseQuantity(id, quantity)
  }

  const onIncrementQuantity = () => {
    increaseQuantity(id)
  }

  const getPrice = () => quantity * cost

  const renderQuantityControl = () => (
    <div className="cart-item-quantity-control-card">
      <button
        type="button"
        className="cart-item-quantity-control-button"
        onClick={onDecrementQuantity}
        testid="decrement-quantity"
      >
        -
      </button>
      <p className="food-item-quantity-count" testid="item-quantity">
        {quantity}
      </p>
      <button
        type="button"
        className="cart-item-quantity-control-button"
        onClick={onIncrementQuantity}
        testid="increment-quantity"
      >
        +
      </button>
    </div>
  )

  const renderPriceCard = () => (
    <div className="cart-item-price-card">
      <BiRupee className="cart-item-cost-icon" />
      <p className="cart-item-cost">{getPrice()}.00</p>
    </div>
  )

  return (
    <li className="cart-item">
      <div className="cart-item-tablet-view" testid="cartItem">
        <div className="cart-item-name-card">
          <img className="cart-item-img" src={imageUrl} alt="" />
          <h1 className="cart-item-name">{name}</h1>
        </div>
        {renderQuantityControl()}
        {renderPriceCard()}
      </div>
      <div className="cart-item-mobile-view">
        <div className="cart-item-image-card">
          <img className="cart-item-img" src={imageUrl} alt="" />
        </div>
        <div className="cart-item-info-card">
          <h1 className="cart-item-name">{name}</h1>
          {renderQuantityControl()}
          {renderPriceCard()}
        </div>
      </div>
    </li>
  )
}

export default CartItem
