import React from 'react'
import GoodsItem from './GoodsItem'

const GoodsList = (props) => {
  const { goods = [] } = props

  if (!goods.length) {
    return <h3>Nothing found</h3>
  }
  return (
    <div className="goods">
      {goods.map((item) => (
        <GoodsItem key={item.mainId} {...item} />
      ))}
    </div>
  )
}

export default GoodsList
