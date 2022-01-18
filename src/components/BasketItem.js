import React from 'react'

const BasketItem = (props) => {
  const { mainId, displayName, finalPrice, quantity } = props

  return (
    <li className="collection-item ">
      {displayName} в количестве:{quantity}. Цена:{finalPrice}
      <span className="secondary-content basket-delete">
        <i className="material-icons">close</i>
      </span>
    </li>
  )
}

export default BasketItem
