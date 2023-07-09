import React from 'react'
import { DateHelpers, NumberHelpers } from '@Utils'
import { TradeStoreHelpers } from '@Store'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

function generateBackgroundImage(type, depth = 100) {
    if (type === TradeStoreHelpers.TradeType.BUY) return `linear-gradient(to left, #113534 ${depth}%, #171713 0%)`
    return `linear-gradient(to right, #3d1e28 ${depth}%, #171713 0%)`
}

const TradeItem = ({ data }) => {
    return (
        <div className="ticker_analytics_table" style={{
            backgroundColor: '#171713',
            backgroundImage: generateBackgroundImage(data.type),
            padding: '0 2rem',
            marginBottom: '0.1rem'
        }}>
            <div className="cell">
                <div className="text">
                    <p>{data.type === TradeStoreHelpers.TradeType.BUY ? <FaCaretUp /> : <FaCaretDown />}</p>
                </div>
            </div>
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
                    <p>{NumberHelpers.formatCryptoNum(data.amount, true, 6)}</p>
                </div>
            </div>
        </div>
    )
}

export default TradeItem
