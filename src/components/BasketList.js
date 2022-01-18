import React from 'react'
import BasketItem from './BasketItem'

const BasketList = (props) => {
  const { order = [], handleBasketShow } = props
  const totalPrice = order.reduce((acc, el) => {
    return acc + el.finalPrice * el.quantity
  }, 0)

  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Корзина</li>
      {order.length ? (
        order.map((item) => <BasketItem key={item.mainId} {...item} />)
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}
      <li className="collection-item active">Общая стоимость: {totalPrice}</li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>
        close
      </i>
    </ul>
  )
}

export default BasketList
