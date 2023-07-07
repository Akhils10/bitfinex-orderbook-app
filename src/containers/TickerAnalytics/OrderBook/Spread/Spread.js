import React from 'react'
import './Spread.css'
import { NumberHelpers } from '@Utils'

const Spread = ({ bids, asks }) => {
  const getHighestBid = (bids) => {
    const prices = bids.map(bid => bid.price)
    return  Math.max.apply(Math, prices)
  }

  const getLowestAsk = (asks) => {
    const prices = asks.map(ask => ask.price)
    return  Math.min.apply(Math, prices)
  }

  const getSpreadAmount = (bids, asks) => Math.abs(getHighestBid(bids) - getLowestAsk(asks))

  const getSpreadPercentage = (spread, highestBid) => `(${((spread * 100) / highestBid).toFixed(2)}%)`

  return (
    <div className="Spread_container">
      Spread: {NumberHelpers.format(getSpreadAmount(bids, asks))} {getSpreadPercentage(getSpreadAmount(bids, asks), getHighestBid(bids))}
    </div>
  )
}

export default Spread
