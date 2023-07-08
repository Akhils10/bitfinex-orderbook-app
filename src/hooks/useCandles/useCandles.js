import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { Bitfinex } from '@APIs'
import { CandleStoreHelpers } from '@Store'

const { selectCandles, updateCandles, selectTimeframe, setCandles, setChannel, clearCandleState } = CandleStoreHelpers

const useCandles = (symbol) => {
    const dispatch = useDispatch()
    const candles = useSelector(selectCandles)
    const timeframe = useSelector(selectTimeframe)
    const mounted = useRef(false)

    const { sendJsonMessage, getWebSocket } = useWebSocket(Bitfinex.WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => processMessages(event)
    })

    const processMessages = (event) => {
        const response = JSON.parse(event.data)
        if (response.event === 'subscribed') {
            dispatch(setChannel(response.chanId))
        } else if (Array.isArray(response)) {
            const getCandleObject = ((data) => ({
                time: data[0],
                open: data[1],
                close: data[2],
                high: data[3],
                low: data[4],
                volume: data[5]
            }))

            const candleData = response[1]
            if (Array.isArray(candleData) && Array.isArray(candleData[0])) {
                const _candles = candleData.map((candle) => getCandleObject(candle))
                dispatch(setCandles(_candles))
            } else if (Array.isArray(candleData)) {
                const formattedCandle = getCandleObject(candleData)
                dispatch(updateCandles(formattedCandle))
            }
        }
    }

    useEffect(() => {
        if (mounted.current) return
        mounted.current = true
        dispatch(clearCandleState())
        const subscribeMessage = {
            event: 'subscribe',
            channel: 'candles',
            key: `trade:${timeframe ? timeframe : '1m'}:${symbol}`
        }
        sendJsonMessage(subscribeMessage)
        return () => {
            sendJsonMessage({
                event: 'unsubscribe',
                channel: 'candles',
                key: `trade:${timeframe ? timeframe : '30m'}:${symbol}`
            })
            getWebSocket()?.close()
        }
    }, [symbol, dispatch, timeframe, sendJsonMessage, getWebSocket])

    return {
        candles
    }
}

export default useCandles
