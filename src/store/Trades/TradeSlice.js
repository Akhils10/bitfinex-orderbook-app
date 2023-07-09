import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    trades: [],
    channel: 0,
    timeframe: '30m'
}

export const tradeSlice = createSlice({
    name: 'trades',
    initialState,
    reducers: {
        setTrades: (state, { payload }) => {
            state.trades = payload
        },
        updateTrades: (state, { payload }) => {
            const index = state.trades.findIndex((trade) => trade.tradeID === payload.tradeID)
            if(index !== -1){
                state.trades[index] = payload
            }else{
                state.trades = [...state.trades, payload]
            }
        },
        setChannel: (state, { payload }) => {
            state.channel = payload
        },
        setTimeframe: (state, { payload }) => {
            state.timeframe = payload
        },
        clearTradeState: (state) => {
            state.trades = []
            state.channel = 0
        }
    }
})

export const { setTrades, updateTrades, setTimeframe, setChannel, clearTradeState } = tradeSlice.actions

export const selectTrades = (state) => state.trades.trades
export const selectChannel = (state) => state.trades.channel
export const selectTimeframe = (state) => state.trades.timeframe

export default tradeSlice.reducer
