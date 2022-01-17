import React, { useState, useEffect } from 'react'
import { API_KEY, API_URL } from '../config'
import Preloader from '../components/Preloader'
import GoodsList from '../components/GoodsList'

const Shop = () => {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(true)

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
      {loading ? <Preloader /> : <GoodsList goods={goods} />}
    </div>
  )
}

export default Shop
