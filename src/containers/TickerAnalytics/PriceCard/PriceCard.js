import { Loader } from '@ComposedComponents'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import './PriceCard.css'
import { Currency, NumberHelpers } from '@Utils'


export default function PriceCard({ ticker }) {
    return (
        <div className="price_card">
            {
                ticker ? (
                    <div className='block'>
                        <div>
                            <div className="text">
                                <h3>Symbol</h3>
                                <p>{ticker.symbol.replace('t', '')}</p>
                            </div>
                            <div className="text">
                                <h3>Bid</h3>
                                <p>{NumberHelpers.formatCryptoNum(ticker.bid, true, 6)}</p>
                            </div>
                            <div className="text">
                                <h3>Price</h3>
                                <p>{NumberHelpers.formatCryptoNum(ticker.lastPrice, true, 6)} {Currency.getCurrencyFromSymbol(ticker.symbol)}</p>
                            </div>
                            <div className="text">
                                <h3>Volume</h3>
                                <p>{Currency.getVolumeInUsd(ticker.lastPrice, ticker.volume)} {Currency.getCurrencyFromSymbol(ticker.symbol)}</p>
                            </div>
                            <div className="text">
                                <h3>Low</h3>
                                <p>{NumberHelpers.formatCryptoNum(ticker.low, true, 6)}</p>
                            </div>
                            <div className="text">
                                <h3>High</h3>
                                <p>{NumberHelpers.formatCryptoNum(ticker.high, true, 6)}</p>
                            </div>
                            <div className="text" data-type={ticker.dailyChange > 0 ? 'gain' : 'loss'}>
                                <h3>Daily change</h3>
                                <p>{NumberHelpers.format(ticker.dailyChange, true, 6)} {Currency.getCurrencyFromSymbol(ticker.symbol)} {ticker.dailyChange > 0 ? <FaCaretUp /> : <FaCaretDown />}</p>
                            </div>
                            <div className="text" data-type={ticker.dailyChangePercentage > 0 ? 'gain' : 'loss'}>
                                <h3>Daily change (%)</h3>
                                <p>{NumberHelpers.format(ticker.dailyChangePercentage, true, 6)}%</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )
            }
        </div>
    )
}
