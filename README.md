# Demo Order Book

[Live app](https://bitfinex-order-book.netlify.app)

## Setup

clone the project, install deps and you are good to go:

```
git clone git@github.com:akhils10/mintlayer-react-test.git
cd mintlayer-react-test
npm i

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.



On localhost, you might need to run the server which you can find in /server 

`
cd /server
npm install
npm start
`
This is primarily to proxy the bitfinex api endpoint because of CORS issues on localhost client. If you do this, then set the REACT_APP_BITFINEX_API_URL to http://localhost:17800/bitfinex-api in an .env file (just rename .env.sample to .env)
