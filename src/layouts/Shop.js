import React, { useState, useEffect } from 'react'
import { API_KEY, API_URL } from '../config'
import Preloader from '../components/Preloader'
import GoodsList from '../components/GoodsList'
import Cart from '../components/Cart'
import BasketList from '../components/BasketList'

const Shop = () => {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState([])
  const [isBasketShow, setBasketShow] = useState(false)

  const handleOrder = (item) => {
    const itemIndex = order.findIndex((el) => el.mainId === item.mainId)

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      }
      setOrder([...order, newItem])
    } else {
      const newOrder = order.map((orderItem, index) => {
        console.log(index, itemIndex)
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          }
        } else {
          return orderItem
        }
      })
      setOrder(newOrder)
    }
  }
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow)
  }

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        data.shop && setGoods(data.shop)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToCart={handleOrder} />
      )}
      {isBasketShow && (
        <BasketList order={order} handleBasketShow={handleBasketShow} />
      )}
    </div>
  )
}

export default Shop
