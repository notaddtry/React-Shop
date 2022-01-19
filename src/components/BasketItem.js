import React from 'react'

const BasketItem = (props) => {
  const {
    mainId,
    displayName,
    finalPrice,
    quantity,
    removeFromCard,
    addItem,
    removeItem,
  } = props

  return (
    <li className="collection-item ">
      {displayName} в количестве:{quantity}. Цена:{finalPrice * quantity}
      <span className="button-order" onClick={() => addItem(mainId)}>
        +
      </span>
      <span className="button-order" onClick={() => removeItem(mainId)}>
        -
      </span>
      <span className="secondary-content basket-delete">
        <i className="material-icons" onClick={() => removeFromCard(mainId)}>
          close
        </i>
      </span>
    </li>
  )
}

export default BasketItem
