import { createSlice } from '@reduxjs/toolkit'

export const OrderType = {
  BIDS: 0,
  ASKS: 1
}

const initialState = {
  channel: 0,
  symbol: 'tBTCUSD',
  rawBooks: [],
  bids: {},
  asks: {},
  maxTotalBids: 0,
  maxTotalAsks: 0,
}

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    setOrderBooks: (state, { payload }) => {
      state.rawBooks = payload
    },
    updateOrderBook: (state, { payload }) => {
      const _asks = state.asks
      const _bids = state.bids
      if (payload.count === 0) {
        if (payload.amount === 1) delete _asks[payload.price]
        if (payload.amount === -1) delete _bids[payload.price]
      } else if (payload.count > 0) {
        if (payload.amount > 0) {
          _asks[payload.price] = payload
        } else {
          _bids[payload.price] = payload
        }
      }
      state.asks = _asks
      state.bids = _bids
    },
    setChannel: (state, { payload }) => {
      state.channel = payload
    },
    addBids: (state, { payload }) => {
      state.bids = payload
    },
    addAsks: (state, { payload }) => {
      state.asks = payload
    },
    clearOrdersState: (state) => {
      state.bids = []
      state.asks = []
      state.rawBooks = []
      state.maxTotalBids = 0
      state.maxTotalAsks = 0
    }
  }
})

export const { addBids, addAsks, setChannel, setOrderBooks, updateOrderBook, clearOrdersState } = orderbookSlice.actions

export const selectBids = (state) => state.orderbook.bids
export const selectAsks = (state) => state.orderbook.asks
export const selectRawBooks = (state) => state.orderbook.rawBooks
export const selectChannel = (state) => state.orderbook.channel

export default orderbookSlice.reducer
