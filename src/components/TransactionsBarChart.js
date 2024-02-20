import React, {useState, useEffect} from 'react'
import {getBarChartData} from './api'
import {Bar} from 'react-chartjs-2'

function TransactionsBarChart() {
  const [barChartData, setBarChartData] = useState([])
  const [month, setMonth] = useState('March')

  useEffect(() => {
    fetchBarChartData()
  }, [month])

  const fetchBarChartData = async () => {
    const data = await getBarChartData(month)
    setBarChartData(data)
  }

  const chartData = {
    labels: barChartData.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <select value={month} onChange={e => setMonth(e.target.value)}></select>
      <div style={{height: '400px'}}>
        <Bar data={chartData} />
      </div>
    </div>
  )
}

export default TransactionsBarChart
