import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { Bitfinex } from '@APIs'
import { TradeStoreHelpers } from '@Store'

const { selectTrades, selectTimeframe, setChannel, setTrades, updateTrades, clearTradeState } = TradeStoreHelpers

const useTrades = (symbol) => {
    const dispatch = useDispatch()
    const trades = useSelector(selectTrades)
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
            const getTradeObject = ((data) => ({
                tradeID: data[0],
                time: data[1],
                amount: Math.abs(data[2]),
                price: data[3],
                type: data[2] > 0 ? TradeStoreHelpers.TradeType.BUY : TradeStoreHelpers.TradeType.SELL
            }))

            const tradeData = response[1]
            if (Array.isArray(tradeData) && Array.isArray(tradeData[0])) {
                const _trades = tradeData.map((trade) => getTradeObject(trade))
                dispatch(setTrades(_trades))
            } else if (Array.isArray(tradeData)) {
                const formattedTrade = getTradeObject(tradeData)
                dispatch(updateTrades(formattedTrade))
            }
        }
    }

    useEffect(() => {
        if (mounted.current) return
        mounted.current = true
        dispatch(clearTradeState())
        const subscribeMessage = {
            event: 'subscribe',
            channel: 'trades',
            symbol
        }
        sendJsonMessage(subscribeMessage)
        return () => {
            sendJsonMessage({
                event: 'unsubscribe',
                channel: 'trades',
                symbol
            })
            getWebSocket()?.close()
        }
    }, [symbol, dispatch, timeframe, sendJsonMessage, getWebSocket])

    const _trades = useMemo(() =>  trades.slice(0, 50), [trades])
    return {
        trades: _trades
    }
}

export default useTrades
