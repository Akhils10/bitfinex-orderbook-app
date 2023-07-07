import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ticker: null,
    channel: 0
}

export const tickerSlice = createSlice({
    name: 'ticker',
    initialState,
    reducers: {
        setTicker: (state, { payload }) => {
            state.ticker = payload
        },
        setChannel: (state, { payload }) => {
            state.channel = payload
        },
        clearTickerState: (state) => {
            state.ticker = null
            state.channel = 0
        }
    }
})

export const { setTicker, setChannel, clearTickerState } = tickerSlice.actions

export const selectChannel = (state) => state.ticker.channel
export const selectTicker = (state) => state.ticker.ticker

export default tickerSlice.reducer
