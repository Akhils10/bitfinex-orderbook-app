import React from 'react'
import { DateHelpers, NumberHelpers } from '@Utils'
import { TradeStoreHelpers } from '@Store'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

function generateBackgroundColor(type) {
    if (type === TradeStoreHelpers.TradeType.BUY) return '#113534'
    return '#3d1e28'
}

const TradeItem = ({ data }) => {
    return (
        <div className="ticker_analytics_table" style={{
            backgroundColor: generateBackgroundColor(data.type),
            padding: '0 2rem',
            marginBottom: '0.1rem'
        }}>
            <div className="cell">
                <div className="text" data-type={data.type === TradeStoreHelpers.TradeType.BUY ? 'gain' : 'loss'}>
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
