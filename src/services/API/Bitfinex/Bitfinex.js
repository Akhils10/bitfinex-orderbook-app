import { EnvVars } from '@Constants'

const ENDPOINTS = {
  GET_PLATFORM_STATUS: '/v2/platform/status',
  GET_TICKER: '/v2/ticker/{symbol}',
  GET_TICKERS: '/v2/tickers?symbols=ALL',
  GET_TRADES: '/v2/trades/{symbol}/hist',
  GET_CANDLES: '/v2/candles/{candle}/{section}'
}

const WSS_FEED_URL = 'wss://api-pub.bitfinex.com/ws/2'

const request = async (url, data = undefined, headers = undefined) => {
  try {
    const response = await fetch(`${EnvVars.BITFINEX_API_URL}${url}`, {
      body: data ? JSON.stringify(data) : undefined
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getPlatformStatus = async () => {
  const response = await request(ENDPOINTS.GET_PLATFORM_STATUS)
  return response[0] === 1 ? 'operative' : 'maintenance'
}

const getTicker = async (symbol) => {
  const ticker = await request(ENDPOINTS.GET_TICKER.replace('{symbol}', symbol))
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

const getTickers = async () => {
  const result = await request(ENDPOINTS.GET_TICKERS)
  return result.map((ticker) => {
    if (ticker.length === 11) {
      return {
        symbol: ticker[0],
        bid: ticker[1],
        bidSize: ticker[2],
        ask: ticker[3],
        askSize: ticker[4],
        dailyChange: ticker[5],
        dailyChangePercentage: ticker[6],
        lastPrice: ticker[7],
        volume: ticker[8],
        high: ticker[9],
        low: ticker[10]
      }
    } else {
      return {
        symbol: ticker[0],
        frr: ticker[1],
        bid: ticker[2],
        bidSize: ticker[3],
        bidPeriod: ticker[4],
        ask: ticker[5],
        askSize: ticker[6],
        askPeriod: ticker[7],
        dailyChange: ticker[8],
        dailyChangePercentage: ticker[9],
        lastPrice: ticker[10],
        volume: ticker[11],
        high: ticker[12],
        low: ticker[13]
      }
    }
  })
}

const getTrades = (symbol) => request(ENDPOINTS.GET_TRADES.replace('{symbol}', symbol))

const getCandles = (duration = '1m', symbol, section = 'hist') => {
  if (!['1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '1W', '14D', '1M'].includes(duration)) throw new Error('Invalid duration')
  const candle = `candle:${duration}:${symbol}`

  return request(
    ENDPOINTS.GET_CANDLES.replace(
      '{candle}',
      candle
    ).replace('{section}', section))
}

export {
  WSS_FEED_URL,
  getPlatformStatus,
  getTicker,
  getTickers,
  getTrades,
  getCandles,
}
