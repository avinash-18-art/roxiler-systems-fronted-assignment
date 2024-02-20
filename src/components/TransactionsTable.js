import React, {useState, useEffect} from 'react'
import {listTransactions} from './api'

function TransactionsTable() {
  const [transactions, setTransactions] = useState([])
  const [searchText, setSearchText] = useState('')
  const [month, setMonth] = useState('March')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchTransactions()
  }, [month, searchText, currentPage])

  const fetchTransactions = async () => {
    const data = await listTransactions(month, searchText, currentPage)
    setTransactions(data)
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1)
    }
  }

  return (
    <div>
      <h2>Transactions Table</h2>
      <select value={month} onChange={e => setMonth(e.target.value)}></select>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder="Search transaction..."
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  )
}

export default TransactionsTable
