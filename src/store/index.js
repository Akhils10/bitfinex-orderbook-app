import { configureStore } from '@reduxjs/toolkit'
import CandleReducer from './Candles/CandleSlice'
import OrderBookReducer from './OrderBook/OrderBookSlice'
import TickerReducer from './Tickers/TickerSlice'
// import TradesReducer from './Trades/TradeSlice'
import * as CandleStoreHelpers from './Candles/CandleSlice'
import * as TickerStoreHelpers from './Tickers/TickerSlice'
import * as OrderBookHelpers from './OrderBook/OrderBookSlice'
import * as TradeStoreHelpers from './Trades/TradeSlice'

export const store = configureStore({
  reducer: {
    candles: CandleReducer,
    orderbook: OrderBookReducer,
    ticker: TickerReducer,
    trades: TradeStoreHelpers.tradeSlice.reducer
  },
})

export {
  CandleStoreHelpers,
  OrderBookHelpers,
  TickerStoreHelpers,
  TradeStoreHelpers
}
