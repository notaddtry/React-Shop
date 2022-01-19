import React, { useState, useEffect } from 'react'
import { API_KEY, API_URL } from '../config'
import Preloader from '../components/Preloader'
import GoodsList from '../components/GoodsList'
import Cart from '../components/Cart'
import BasketList from '../components/BasketList'
import Alert from '../components/Alert'

const Shop = () => {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState([])
  const [isBasketShow, setBasketShow] = useState(false)
  const [alertName, setAlertName] = useState('')

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
    setAlertName(item.displayName)
  }
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow)
  }
  const removeFromCard = (id) => {
    const updateOrder = order.filter((el) => el.mainId !== id)
    setOrder(updateOrder)
  }
  const addItem = (id) => {
    const newOrder = order.map((orderItem) => {
      if (id === orderItem.mainId) {
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
  const removeItem = (id) => {
    const newOrder = order.map((orderItem) => {
      if (id === orderItem.mainId) {
        if (orderItem.quantity > 0) {
          return {
            ...orderItem,
            quantity: orderItem.quantity - 1,
          }
        } else
          return {
            ...orderItem,
            quantity: 0,
          }
      } else {
        return orderItem
      }
    })
    setOrder(newOrder)
  }
  const closeAlert = () => {
    setAlertName('')
  }

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((r) => r.json())
      .then((data) => {
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
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromCard={removeFromCard}
          addItem={addItem}
          removeItem={removeItem}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </div>
  )
}

export default Shop
