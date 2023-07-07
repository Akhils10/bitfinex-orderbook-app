import { useWsTicker } from '@Hooks'
import { useParams } from 'react-router-dom'
import './TickerAnalytics.css'
import { ChartContainer, OrderBook, PriceCard } from '@ContainerComponents'

const TickerAnalyticsPage = () => {
  const { symbol } = useParams()
  const { ticker } = useWsTicker(symbol)

  return (
    <div className="ticker_analytics">
      <div className="full_width_row">
        <PriceCard ticker={ticker} />
        <ChartContainer symbol={symbol} />
      </div>

      <OrderBook symbol={symbol} scale={1} />
    </div>
  )
}

export default TickerAnalyticsPage
