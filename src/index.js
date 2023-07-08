import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import { Bitfinex } from '@APIs'
import { store } from './store'
import { Provider } from 'react-redux'
import {
  HomePage, TickerAnalyticsPage
} from '@Pages'

import reportWebVitals from './utils/reportWebVitals'
import { MainLayout } from '@LayoutComponents'
import '@Assets/styles/index.css'


const App = () => {
  const mounted = useRef(false)
  const [serverUnavailable, setServerUnavailable] = useState(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    const isConnectionAvailable = async () => {
      try {
        const bitfinexStatus = await Bitfinex.getPlatformStatus()
        setServerUnavailable(bitfinexStatus === 'maintenance')
      } catch (error) {
        setServerUnavailable(false)
      }
    }
    isConnectionAvailable()
  }, [])

  return (
    <>
      <MainLayout>
        {serverUnavailable && (
          <p>Bitfinex server is currently under maintenance. Reload the page or try again after some time</p>
        )}
        <Routes>
          <Route
            path="/ticker/:symbol"
            element={<TickerAnalyticsPage />}
          />
          <Route
            exact
            path="/"
            element={<HomePage />}
          />
        </Routes>

      </MainLayout>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
