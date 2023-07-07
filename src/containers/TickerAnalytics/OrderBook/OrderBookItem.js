import PriceRow from './PriceRow/PriceRow'
import TitleRow from './TitleRow/TitleRow'

export default function OrderBookItem({ data, maxTotal, scale, type = 'bids' }) {
    return (
        <div className="ticker_analytic_table">
            <h1>{type === 'bids' ? 'BIDS' : 'ASKS'}</h1>
            {data && data.length && (
                <>
                    <TitleRow reversedFieldsOrder={type === 'bids'} />
                    <div className="ticker_block">
                        {
                            data.map((item, index) => <PriceRow data={item} maxTotal={maxTotal} scale={scale} reversedFieldsOrder={type === 'bids'} key={`${type}-${item.price}-${index}`} />)
                        }
                    </div>
                </>)
            }
        </div>
    )
}
