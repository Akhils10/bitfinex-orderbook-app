import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    candles: [],
    channel: 0,
    timeframe: '1m'
}

export const candleSlice = createSlice({
    name: 'candles',
    initialState,
    reducers: {
        setCandles: (state, { payload }) => {
            state.candles = payload.reverse()
        },
        updateCandles: (state, { payload }) => {
            const index = state.candles.findIndex((candle) => candle.time === payload.time)
            if(index !== -1){
                state.candles[index] = payload
            }else{
                state.candles = [...state.candles, payload]
            }
        },
        setChannel: (state, { payload }) => {
            state.channel = payload
        },
        setTimeframe: (state, { payload }) => {
            state.timeframe = payload
        },
        clearCandleState: (state) => {
            state.candles = []
            state.channel = 0
        }
    }
})

export const { setCandles, updateCandles, setTimeframe, setChannel, clearCandleState } = candleSlice.actions

export const selectCandles = (state) => state.candles.candles
export const selectChannel = (state) => state.candles.channel
export const selectTimeframe = (state) => state.candles.timeframe

export default candleSlice.reducer
