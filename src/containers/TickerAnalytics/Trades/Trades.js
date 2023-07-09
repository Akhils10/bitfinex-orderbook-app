import { useTrades } from '@Hooks'
import { Loader } from '@ComposedComponents'
import TradeItem from './Trade'
import TitleRow from './TitleRow'
import './Trades.css'

export default function Trades({ symbol }) {
    const { trades } = useTrades(symbol)
    return (
        <div className="trade_card_container" style={{ marginTop: '5rem'}}>
            <div className="trade_card">
                {
                    (trades && trades.length) ? (
                        <div className="ticker_analytic_table">
                            <h1>Trades</h1>
                            <TitleRow />
                            <div className="ticker_block" style={{ overflowY: 'scroll'}}>
                                {
                                    trades.map((item, index) => <TradeItem data={item} key={`trade-${item.tradeID}-${index}`} />)
                                }
                            </div>
                        </div>
                    ) : <Loader />
                }
            </div>
        </div>
    )
}
