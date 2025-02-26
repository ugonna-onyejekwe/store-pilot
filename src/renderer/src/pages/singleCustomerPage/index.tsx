import { Input } from '@renderer/components/inputs'
import Navbar from '@renderer/components/Navbar'
import Button from '@renderer/components/ui/Button'
import { DataTable } from '@renderer/components/ui/table'
import { History_column } from '@renderer/components/ui/table/columns/hsitoryColumn'
import { convertAmount } from '@renderer/lib/utils'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'

const SingleCustomer = () => {
  const { name } = useParams()
  const [searchValue, setSearchValue] = useState('')
  const [date, setDate] = useState('')

  const customerData = {
    name: 'ugonna onyejekwe',
    lastPaymentDate: 'Feb, 13, 2025',
    paymentStatus: 'outstanding',
    amountToPay: 2000000,
    customerId: '132'
  }

  return (
    <>
      <Navbar currentPage={name!} prevPageLink={'/customers'} isSearchable={false} />

      <div className="container single_customer_page">
        <div className="page_header">
          <div className="payment_status_con">
            <span className={`status status__${customerData.paymentStatus}`}>
              {customerData.paymentStatus}
            </span>

            <h3>
              Outsanding amount: <span>{convertAmount(customerData.amountToPay)}</span>
            </h3>
          </div>

          <Button text="Sell goods to this customer" />
        </div>

        <div className="filter_con">
          <div className="search_con">
            <Input
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>

          <div className="date_con">
            <input type="date" onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <DataTable columns={History_column} isClickable data={[]} isLoading={false} />
      </div>
    </>
  )
}

export default SingleCustomer
