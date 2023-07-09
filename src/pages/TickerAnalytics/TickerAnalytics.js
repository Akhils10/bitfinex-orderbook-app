import { useWsTicker } from '@Hooks'
import { useParams } from 'react-router-dom'
import { ChartContainer, OrderBook, PriceCard, Trades } from '@ContainerComponents'
import './TickerAnalytics.css'

const TickerAnalyticsPage = () => {
  const { symbol } = useParams()
  const { ticker } = useWsTicker(symbol)

  return (
    <div className="ticker_analytics">
      <div className="full_width_row">
        <PriceCard ticker={ticker} />
        <ChartContainer symbol={symbol} />
      </div>

      <div className="full_width_row" style={{ marginBottom: '5rem'}}>
        <OrderBook symbol={symbol} scale={1} />
        <Trades symbol={symbol} />
      </div>
    </div>
  )
}

export default TickerAnalyticsPage
