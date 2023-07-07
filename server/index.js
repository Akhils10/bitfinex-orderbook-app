const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const errorMiddleware = require('./middlewares/error.middleware')
const morgan = require('morgan')
const helmet = require('helmet')
const { stream } = require('./helpers/logger')

const PORT = process.env.PORT || 17800

const app = express()

app.use(morgan('dev', { stream }))
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(errorMiddleware)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(
    '/bitfinex-api',
    createProxyMiddleware({
        target: 'https://api-pub.bitfinex.com/',
        changeOrigin: true,
        pathRewrite: {
            '^/bitfinex-api': '', // Remove the '/bitfinex-api' from the request path
        },
    })
)

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`)
})
