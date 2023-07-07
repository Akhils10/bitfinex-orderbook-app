import { useEffect, useState, useRef, useCallback } from 'react'

import { Bitfinex } from '@APIs'

const useTickers = () => {
  const effectCalled = useRef(false)
  const [tickers, setTickers] = useState([])

  const fetchTickers = useCallback(async () => {
    try {
      const result = await Bitfinex.getTickers()
      setTickers(result)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (effectCalled.current) return
    effectCalled.current = true

    fetchTickers()
  }, [fetchTickers])

  return { tickers }
}

export default useTickers
