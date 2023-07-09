import React from 'react'
import { NumberHelpers } from '@Utils'
import './PriceRow.css'

function generateBackgroundImage(depth, type) {
  if (type === 'bids') return `linear-gradient(to left, #113534 ${depth}%, #171713 0%)`
  return `linear-gradient(to right, #3d1e28 ${depth}%, #171713 0%)`
}

const PriceRow = ({
  data,
  maxTotal,
  scale,
  reversedFieldsOrder = false,
}) => {
  const depth = ((data.total * 100) / (maxTotal * scale)) + 5
  return (
    <div className="ticker_analytics_table" style={{
      backgroundColor: '#171713',
      backgroundImage: generateBackgroundImage(depth, reversedFieldsOrder ? 'bids' : 'asks'),
      padding: '0 2rem'
    }}>
      {reversedFieldsOrder ?
        <>
          <div className="cell">
            <div className="text">
              <p>{data.count}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.amount, true, 6)}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.total, true, 6)}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.price, true, 6)}</p>
            </div>
          </div>
        </> :
        <>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.price, true, 6)}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.total, true, 6)}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{NumberHelpers.formatCryptoNum(data.amount, true, 6)}</p>
            </div>
          </div>
          <div className="cell">
            <div className="text">
              <p>{data.count}</p>
            </div>
          </div>
        </>}
    </div>
  )
}

export default PriceRow
