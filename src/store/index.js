import { configureStore } from '@reduxjs/toolkit'
import CandleReducer from './Candles/CandleSlice'
import TickerReducer from './Tickers/TickerSlice'
import OrderBookReducer from './OrderBook/OrderBookSlice'
import * as CandleStoreHelpers from './Candles/CandleSlice'
import * as TickerStoreHelpers from './Tickers/TickerSlice'
import * as OrderBookHelpers from './OrderBook/OrderBookSlice'

export const store = configureStore({
  reducer: {
    candles: CandleReducer,
    ticker: TickerReducer,
    orderbook: OrderBookReducer,
  },
})


export {
  CandleStoreHelpers,
  OrderBookHelpers,
  TickerStoreHelpers
}
