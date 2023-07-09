import React from 'react'
import { DateHelpers, NumberHelpers } from '@Utils'

function generateBackgroundImage(type, depth = 100) {
    console.log(depth, type, 'dsd')
    if (type === 'buy') return `linear-gradient(to left, #113534 ${depth}%, #171713 0%)`
    return `linear-gradient(to right, #3d1e28 ${depth}%, #171713 0%)`
}

const TradeItem = ({ data, maxTotal = 10 }) => {
    return (
        <div className="ticker_analytics_table" style={{
            backgroundColor: '#171713',
            backgroundImage: generateBackgroundImage(data.type === 'buy' ? 'buy' : 'sell'),
            padding: '0 2rem'
        }}>
            <div className="cell">
                <div className="text">
                    <p>{DateHelpers.getTimeFromDate(data.time)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text">
                    <p>{NumberHelpers.formatCryptoNum(data.price, true, 4)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text">
                    <p>{NumberHelpers.formatCryptoNum(data.amount, true, 4)}</p>
                </div>
            </div>
        </div>
    )
}

export default TradeItem
