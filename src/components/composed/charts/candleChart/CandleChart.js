import {
    useRef,
    useState,
    useEffect,
    useCallback,
} from 'react'
import { createChart } from 'lightweight-charts'
import { format } from 'date-fns'
import Loader from '../../Loader/Loader'

const CandleChart = ({
    data,
    setValue,
    setLabel,
    ...rest
}) => {
    const chartRef = useRef(null)
    const [chartCreated, setChart] = useState()

    const handleResize = useCallback(() => {
        if (chartCreated && chartRef?.current?.parentElement) {
            chartCreated.resize(
                chartRef.current.parentElement.clientWidth - 32,
                chartRef.current.parentElement.clientHeight
            )
            chartCreated.timeScale().fitContent()
            chartCreated.timeScale().scrollToPosition(0, false)
        }
    }, [chartCreated, chartRef])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [chartRef, handleResize])

    useEffect(() => {
        if (!chartCreated && data && !!chartRef?.current?.parentElement) {
            const chart = createChart(chartRef.current, {
                height: chartRef.current.parentElement.clientHeight,
                width: chartRef.current.parentElement.clientWidth - 32,
                layout: {
                    backgroundColor: 'transparent',
                    textColor: 'white',
                    fontFamily: 'Kanit, sans-serif',
                    fontSize: 12,
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    },
                    borderVisible: false,
                },
                timeScale: {
                    rightOffset: 2,
                    barSpacing: 20,
                    borderVisible: false,
                    secondsVisible: true,
                    tickMarkFormatter: (unixTime) => {
                        return format(unixTime, 'yyyy/MM/dd')
                    },
                },
                watermark: {
                    visible: false,
                },
                grid: {
                    horzLines: {
                        visible: false,
                    },
                    vertLines: {
                        visible: false,
                    },
                },
                autoSize: true,
                crosshair: {
                    horzLine: {
                        visible: false,
                        labelVisible: false,
                    },
                    mode: 1,
                    vertLine: {
                        visible: true,
                        labelVisible: false,
                        style: 3,
                        width: 1,
                        color: 'white',
                        labelBackgroundColor: 'rgba(3, 3, 0, 1)',
                    },
                },
            })
            chart.timeScale().fitContent()
            setChart(chart)
        }
    }, [chartCreated, data, setValue])

    function hoverEffect(tooltip) {
        tooltip.style.display = 'block'
    }

    useEffect(() => {
        if (chartCreated && data) {
            const series = chartCreated.addCandlestickSeries({
                upColor: 'rgba(92, 143, 38, 1)',
                downColor: 'rgba(192, 54, 45, 1)',
                borderDownColor: 'rgba(192, 54, 45, 1)',
                borderUpColor: 'rgba(92, 143, 38, 1)',
                wickDownColor: 'rgba(192, 54, 45, 1)',
                wickUpColor: 'rgba(92, 143, 38, 1)',
            })

            const volumeSeries = chartCreated.addHistogramSeries({
                color: 'rgba(0, 150, 136, 0.4)',
                lineWidth: 2,
                priceFormat: {
                    type: 'volume',
                },
                overlay: true,
                scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                },
            })

            series.setData(data)
            volumeSeries.setData(data.map((item) => ({ time: item.time, value: item.volume })))

            const toolTipWidth = 80
            const toolTipHeight = 80
            const toolTipMargin = 15
            const container = document.getElementById('candle-chart')
            // Create and style the tooltip html element
            const toolTip = document.createElement('div')
            toolTip.setAttribute('class', 'hoverable')
            toolTip.style.position = 'absolute'
            toolTip.style.left = '12px'
            toolTip.style.top = '30px'
            toolTip.style.padding = '8px'
            toolTip.style.borderRadius = '2px'
            toolTip.style.background = '#21201B'
            toolTip.style.color = 'white'
            toolTip.style.display = 'none'
            toolTip.style.zIndex = '100'

            toolTip.style.borderColor = '#2962FF'
            toolTip.addEventListener('mouseenter', () => hoverEffect(toolTip))
            container?.appendChild(toolTip)

            // update tooltip
            chartCreated.subscribeCrosshairMove(param => {
                if (container) {
                    if (
                        param.point === undefined ||
                        !param.time ||
                        param.point.x < 0 ||
                        param.point.x > container.clientWidth ||
                        param.point.y < 0 ||
                        param.point.y > container.clientHeight
                    ) {
                        toolTip.style.display = 'none'
                    } else if (series && param) {
                        const timestamp = param.time
                        const now = new Date(timestamp)
                        const time = `${now.toLocaleString('en-GB', {
                            timeZone: 'UTC',
                        })}AM (UTC)`
                        toolTip.style.display = 'block'
                        const price = param.seriesPrices.get(series)
                        const volume = param.seriesPrices.get(volumeSeries)
                        toolTip.innerHTML = `<div style="color: ${'#69AEF4'}">
						<p style="font-size: 10px; margin: 0; color: ${'#69AEF4'}">
						${time}
								</p>
						</div><div style="font-size: 14px; margin: 4px 0px; color: ${'#EBEBEA'}">
						<p style="font-size: 10px; margin: 0; color: ${'#EBEBEA'}">
						<span style="font-size: 10px; font-weight: 700; margin: 0 2rem 0 0; color: ${'#C1C0BE'}">Open:</span>
						${price && price.open ? price.open : null}
						</p>
						<p style="font-size: 10px; margin: 0; color: ${'#EBEBEA'}">
						<span style="font-size: 10px; font-weight: 700; margin: 0 2rem 0 0; color: ${'#C1C0BE'}">High:</span>
						${price && price.high ? price.high : null}
						</p>
						<p style="font-size: 10px; margin: 0; color: ${'#EBEBEA'}">
						<span style="font-size: 10px; font-weight: 700; margin: 0 2rem 0 0; color: ${'#C1C0BE'}">Low:</span>
						${price && price.low ? price.low : null}
						</p>
						<p style="font-size: 10px; margin: 0; color: ${'#EBEBEA'}">
						<span style="font-size: 10px; font-weight: 700; margin: 0 2rem 0 0; color: ${'#C1C0BE'}">Close:</span>
						${price && price.close ? price.close : null}
						</p>
                        ${
                            volume ? `<p style="font-size: 10px; margin: 0; color: ${'#EBEBEA'}">
                            <span style="font-size: 10px; font-weight: 700; margin: 0 2rem 0 0; color: ${'#C1C0BE'}">Volume:</span>
                            ${volume}
                            </p>` : ''
                        }
                        
				</div>`
                        const coordinate = series.priceToCoordinate(price)
                        let shiftedCoordinate = param.point.x - 50
                        if (coordinate === null) {
                            return
                        }
                        shiftedCoordinate = Math.max(
                            0,
                            Math.min(
                                container.clientWidth - toolTipWidth,
                                shiftedCoordinate
                            )
                        )
                        const coordinateY =
                            coordinate - toolTipHeight - toolTipMargin > 0
                                ? coordinate - toolTipHeight - toolTipMargin
                                : Math.max(
                                    0,
                                    Math.min(
                                        container.clientHeight -
                                        toolTipHeight -
                                        toolTipMargin,
                                        coordinate + toolTipMargin
                                    )
                                )
                        toolTip.style.left = shiftedCoordinate + 'px'
                        toolTip.style.top = coordinateY + 'px'
                    }
                }
            })

            chartCreated.subscribeCrosshairMove(param => {
                if (
                    chartRef?.current &&
                    (param === undefined ||
                        param.time === undefined ||
                        (param && param.point && param.point.x < 0) ||
                        (param &&
                            param.point &&
                            param.point.x > chartRef.current.clientWidth) ||
                        (param && param.point && param.point.y < 0) ||
                        (param &&
                            param.point &&
                            param.point.y > chartRef.current.clientHeight))
                ) {
                    // reset values
                    if (setValue) setValue(undefined)
                    if (setLabel) setLabel(undefined)
                } else if (series && param) {
                    const timestamp = param.time
                    const now = new Date(timestamp)
                    const time = `${now.toLocaleString('en-GB', {
                        timeZone: 'UTC',
                    })}AM (UTC)`
                    const parsed = param.seriesPrices.get(series)
                    if (setValue) setValue(parsed?.open)
                    if (setLabel) setLabel(time)
                }
            })

            return () => {
                toolTip.removeEventListener('mouseenter', hoverEffect)
            }
        }
    }, [chartCreated, data, setValue, setLabel])
    return (
        <>
            {!chartCreated && !data && <Loader />}
            {data && data.length < 1 && (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <h1>No Chart Data</h1>
                </div>
            )}
            {data && data.length > 0 && (
                <div ref={chartRef} id="candle-chart" {...rest}></div>
            )}
        </>
    )
}

export default CandleChart
