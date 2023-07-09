import { useTickers } from '@Hooks'
import { Tickers } from '@ContainerComponents'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useRef, useState } from 'react'
import { Loader } from '@ComposedComponents'
import './Home.css'

const HomePage = () => {
  const mounted = useRef(false)
  const { tickers } = useTickers()
  const [currentIndex, setCurrentIndex] = useState(20)
  const [data, setData] = useState([])
  const [loadMore, setLoadMore] = useState(false)

  useEffect(() => {
    if (mounted.current) return
    if (tickers.length) {
      mounted.current = true
      setData(tickers.slice(0, 20))
    }
  }, [tickers])


  const getMoreData = () => {
    const _data = tickers.slice(currentIndex, currentIndex + 20)
    setCurrentIndex(currentIndex + 20)
    if (_data) {
      const newData = [...data, ..._data]
      setData([...newData])
    }
    setLoadMore(tickers.length === data.length)
  }

  return (
    <div className="tickers">
      <InfiniteScroll
        dataLength={data.length}
        next={getMoreData}
        hasMore={!loadMore}
        loader={<Loader />}
        endMessage={<h4 style={{textAlign: 'center'}}>Nothing more to show...</h4>}
      >
        <Tickers dataSource={data} />
      </InfiniteScroll>
    </div>
  )
}

export default HomePage
