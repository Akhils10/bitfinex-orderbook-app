import { useEffect, useState, useRef, useCallback } from 'react'

import { Bitfinex } from '@APIs'

const useTicker = (symbol) => {
  const effectCalled = useRef(false)
  const [ticker, setTicker] = useState(null)

  const fetchTicker = useCallback(async () => {
    try {
      const result = await Bitfinex.getTicker(symbol)
      setTicker(result)
    } catch (error) {
      console.error(error)
    }
  }, [symbol])

  useEffect(() => {
    if (effectCalled.current) return
    effectCalled.current = true

    fetchTicker()
  }, [fetchTicker])

  return { ticker }
}

export default useTicker
