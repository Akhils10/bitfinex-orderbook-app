import Ticker from './Ticker'
import TitleRow from './TitleRow'
import { useNavigate } from 'react-router-dom'
import './Tickers.css'


export default function Tickers({ dataSource }) {
    const navigate = useNavigate()

    const clickHandler = (symbol) => {
        navigate(`/ticker/${symbol}`)
    }
    return (
        <div className="table">
            <div className="table_container">
                <TitleRow />
                <div className="ticker_block">
                    {
                        dataSource && dataSource.length ? (
                            dataSource.map((ticker, index) => {
                                return (
                                    <Ticker ticker={ticker} clickHandler={() => clickHandler(ticker.symbol)} key={`ticker-${ticker.symbol}-${index}`} />
                                )
                            })
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}
