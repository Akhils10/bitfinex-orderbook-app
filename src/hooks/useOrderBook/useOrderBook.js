import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import { Bitfinex } from '@APIs'
import { OrderBookHelpers } from '@Store'

const { selectAsks, selectBids, setChannel, addAsks, addBids, setOrderBooks, updateOrderBook, clearOrdersState } = OrderBookHelpers

const useOrderBook = (symbol) => {
    const dispatch = useDispatch()
    const bidsState = useSelector(selectBids)
    const asksState = useSelector(selectAsks)
    const mounted = useRef(false)

    const { sendJsonMessage, getWebSocket } = useWebSocket(Bitfinex.WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => processMessages(event)
    })

    /**
     *
     * @param {{data: string}} event
     */
    const processMessages = (event) => {
        const response = JSON.parse(event.data)
        if (response.event === 'subscribed') {
            dispatch(setChannel(response.chanId))
        } else if (Array.isArray(response)) {

            const getOrderObject = ((orderBook) => ({
                price: orderBook[0],
                count: orderBook[1],
                amount: orderBook[2],
            }))

            const orderBookData = response[1]
            if (Array.isArray(orderBookData) && Array.isArray(orderBookData[0])) {
                const orders = orderBookData.map((order) => getOrderObject(order))
                sortOrders(orders)
                dispatch(setOrderBooks(orders))
            } else if (Array.isArray(orderBookData)) {
                dispatch(updateOrderBook(getOrderObject(orderBookData)))
            }
        }
    }

    /**
     *
     * @param {Array<{price: number; count: number; amount: number}>} orderBook
     */
    const sortOrders = (orderBook) => {
        const _bids = {}
        const _asks = {}

        orderBook.forEach((order) => {
            if (order.amount > 0) {
                _asks[order.price] = order
            } else {
                _bids[order.price] = order
            }
        })
        dispatch(addAsks(_asks))
        dispatch(addBids(_bids))
    }

    useEffect(() => {
        if (mounted.current) return
        mounted.current = true
        dispatch(clearOrdersState())
        const subscribeMessage = {
            event: 'subscribe',
            channel: 'book',
            symbol,
            prec: 'P0',
            freq: 'F0',
        }
        sendJsonMessage(subscribeMessage)
        return () => {
            sendJsonMessage({
                event: 'unsubscribe',
                channel: 'book',
                symbol,
            })
            getWebSocket()?.close()
        }
    }, [symbol, dispatch, sendJsonMessage, getWebSocket])

    const _asks = Object.keys(asksState).slice(0, 20).reduce((acc, k, i) => {
        const total = Object.keys(asksState).slice(0, i + 1).reduce((t, i) => {
            t = t + Math.abs(asksState[i].amount)
            return t
        }, 0)
        const item = asksState[k]
        acc[k] = { ...item, amount: Math.abs(item.amount), total }
        return acc
    }, {})

    const maxAsksTotal = Object.keys(_asks).reduce((t, i) => {
        if (t < _asks[i].total) {
            return _asks[i].total
        }
        else {
            return t
        }
    }, 0)

    const _bids = Object.keys(bidsState).slice(0, 20).reduce((acc, k, i) => {
        const total = Object.keys(bidsState).slice(0, i + 1).reduce((t, i) => {
            t = t + Math.abs(bidsState[i].amount)
            return t
        }, 0)
        const item = bidsState[k]
        acc[k] = { ...item, amount: Math.abs(item.amount), total }
        return acc
    }, {})

    const maxBidsTotal = Object.keys(_bids).reduce((t, i) => {
        if (t < _bids[i].total) {
            return _bids[i].total
        }
        else {
            return t
        }
    }, 0)

    const asks = useMemo(() => {
        return Object.keys(_asks).map((item) => ({ price: _asks[item].price, amount: _asks[item].amount, count: _asks[item].count, total: _asks[item].total}))
    }, [_asks])

    const bids = useMemo(() => {
        return Object.keys(_bids).map((item) => ({ price: _bids[item].price, amount: _bids[item].amount, count: _bids[item].count, total: _bids[item].total }))
    }, [_bids])

    return {
        asks,
        bids,
        maxAsksTotal,
        maxBidsTotal
    }
}

export default useOrderBook
