import { MOBILE_WIDTH } from '@Constants'
import { OrderBookHelpers } from '@Store'
import React from 'react'

const DepthVisualizerColors = {
  BIDS: '#113534',
  ASKS: '#3d1e28'
}

const DepthVisualizer = ({windowWidth, depth, orderType }) => {
  return <div style={{
    backgroundColor: `${orderType === OrderBookHelpers.OrderType.BIDS ? DepthVisualizerColors.BIDS : DepthVisualizerColors.ASKS}`,
    height: '1.250em',
    width: `${depth}%`,
    position: 'relative',
    top: 21,
    left: `${orderType === OrderBookHelpers.OrderType.BIDS && windowWidth > MOBILE_WIDTH ? `${100 - depth}%` : 0}`,
    marginTop: -24,
    zIndex: 1,
  }} />
}

export default DepthVisualizer
