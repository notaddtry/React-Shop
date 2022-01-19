import React from 'react'

const GoodsItem = (props) => {
  const {
    mainId,
    displayName,
    displayDescription,
    price: { finalPrice },
    displayAssets: [{ full_background }],
    // rarity,
    addToCart = Function.prototype,
  } = props

  return (
    <div className="card cardWrapper">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={full_background} />
      </div>
      <div className="card-content card-content-wrapper">
        <span className="card-title activator grey-text text-darken-4">
          {displayName}
        </span>
        <p className="description">{displayDescription}</p>
        <p className="price">
          {finalPrice}
          <button
            className="btn"
            onClick={() =>
              addToCart({
                mainId,
                displayName,
                finalPrice,
              })
            }
          >
            Add to card
          </button>
        </p>
      </div>
    </div>
  )
}

export default GoodsItem
