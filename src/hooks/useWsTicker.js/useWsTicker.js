import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { Bitfinex } from '@APIs'
import { TickerStoreHelpers } from '@Store'

const { selectTicker, setTicker, setChannel, clearTickerState } = TickerStoreHelpers

const useWsTicker = (symbol) => {
    const dispatch = useDispatch()
    const ticker = useSelector(selectTicker)
    const mounted = useRef(false)

    const { sendJsonMessage, getWebSocket } = useWebSocket(Bitfinex.WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => processMessages(event)
    })

    const getTickerObject = (ticker) => {
        if (ticker.length === 10) {
            return {
                symbol,
                bid: ticker[0],
                bidSize: ticker[1],
                ask: ticker[2],
                askSize: ticker[3],
                dailyChange: ticker[4],
                dailyChangePercentage: ticker[5],
                lastPrice: ticker[6],
                volume: ticker[7],
                high: ticker[8],
                low: ticker[9]
            }
        } else {
            return {
                symbol,
                frr: ticker[0],
                bid: ticker[1],
                bidSize: ticker[2],
                bidPeriod: ticker[3],
                ask: ticker[4],
                askSize: ticker[5],
                askPeriod: ticker[6],
                dailyChange: ticker[7],
                dailyChangePercentage: ticker[8],
                lastPrice: ticker[9],
                volume: ticker[10],
                high: ticker[11],
                low: ticker[12]
            }
        }
    }

    /**
     *
     * @param {{data: string}} event
    */
    const processMessages = (event) => {
        const response = JSON.parse(event.data)
        if (response.event === 'subscribed') {
            dispatch(setChannel(response.chanId))
        } else if (Array.isArray(response)) {
            const tickerData = response[1]
            if (Array.isArray(tickerData)) {
                dispatch(setTicker(getTickerObject(tickerData)))
            }
        }
    }

    useEffect(() => {
        if (mounted.current) return
        mounted.current = true
        dispatch(clearTickerState())
        const subscribeMessage = {
            event: 'subscribe',
            channel: 'ticker',
            symbol: symbol,
        }
        sendJsonMessage(subscribeMessage)
        return () => {
            sendJsonMessage({
                event: 'unsubscribe',
                channel: 'ticker',
                symbol: symbol
            })
            getWebSocket()?.close()
        }
    }, [symbol, dispatch, sendJsonMessage, getWebSocket])


    return {
        ticker
    }
}

export default useWsTicker
