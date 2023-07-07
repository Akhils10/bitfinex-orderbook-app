import { useOrderBook } from '@Hooks'
import OrderBookItem from './OrderBookItem'
import { Loader } from '@ComposedComponents'
import './OrderBook.css'

export default function OrderBook({ symbol, scale }) {
    const { bids, asks, maxBidsTotal, maxAsksTotal } = useOrderBook(symbol)
    return (
        <div className="order_book_container" style={{ marginTop: '5rem'}}>
            <div className="order_book_flex">
                {
                    (bids && bids.length) && (asks && asks.length) ? (
                        <>
                            <OrderBookItem data={bids} type="bids" maxTotal={maxBidsTotal} scale={scale} />
                            <OrderBookItem data={asks} type="asks" maxTotal={maxAsksTotal} scale={scale} />
                        </>
                    ) : <Loader />
                }
            </div>
        </div>
    )
}
