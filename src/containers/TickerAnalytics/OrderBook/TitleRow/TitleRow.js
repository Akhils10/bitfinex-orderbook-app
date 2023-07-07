import React from 'react'
import './TitleRow.css'

const TitleRow = ({ reversedFieldsOrder = false }) => {
  return (
    <div className="ticker_analytics_title">
      {
        reversedFieldsOrder ? (
          <>
            <div className="cell">
              <div className="text">
                <h3>Count</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Amount</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Total</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Price</h3>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cell">
              <div className="text">
                <h3>Price</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Total</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Amount</h3>
              </div>
            </div>
            <div className="cell">
              <div className="text">
                <h3>Count</h3>
              </div>
            </div>
          </>
        )
      }


    </div>
  )
}

export default TitleRow
