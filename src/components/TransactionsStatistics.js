import React, {useState, useEffect} from 'react'
import {getStatistics} from './api'

function TransactionsStatistics() {
  const [statistics, setStatistics] = useState({})
  const [month, setMonth] = useState('March')

  useEffect(() => {
    fetchStatistics()
  }, [month])

  const fetchStatistics = async () => {
    const data = await getStatistics(month)
    setStatistics(data)
  }

  return (
    <div>
      <h2>Transactions Statistics</h2>
      <select value={month} onChange={e => setMonth(e.target.value)}></select>
      <div>
        <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  )
}

export default TransactionsStatistics
