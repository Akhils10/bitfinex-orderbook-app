import { Currency, NumberHelpers } from '@Utils'

export default function Ticker({ ticker, clickHandler }) {
    return (
        <div className="tickers_table">
            <div className="cell">
                <div className="text" onClick={clickHandler} style={{ cursor: 'pointer' }}>
                    <p>{ticker.symbol.replace('t', '').replace('f', '')}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text">
                    <p>{NumberHelpers.formatCryptoNum(ticker.bid, true, 3)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text">
                    <p>{NumberHelpers.formatCryptoNum(ticker.lastPrice, true, 3)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text">
                    <p>{Currency.getVolumeInUsd(ticker.lastPrice, ticker.volume)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text" data-type={ticker.dailyChange > 0 ? 'gain' : 'loss'}>
                    <p>{NumberHelpers.formatCryptoNum(ticker.dailyChange, true, 3)}</p>
                </div>
            </div>
            <div className="cell">
                <div className="text" data-type={ticker.dailyChangePercentage > 0 ? 'gain' : 'loss'}>
                    <p>{NumberHelpers.format(ticker.dailyChangePercentage, true, 3)}%</p>
                </div>
            </div>
            <div className="cell">
                <button className="button" onClick={clickHandler}>
                    <p>View</p>
                </button>
            </div>
        </div>

    )
}
