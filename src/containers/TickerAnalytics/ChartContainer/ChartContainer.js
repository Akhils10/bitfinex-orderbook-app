import { useCandles } from '@Hooks'
import './ChartContainer.css'
import { CandleChart, Loader } from '@ComposedComponents'

export default function ChartContainer({ symbol }) {
    const { candles } = useCandles(symbol)

    return <div className="chart">
        {candles.length ? <CandleChart data={candles} /> : <Loader />}
    </div>
}
