import { useGetCustomerHistory } from '@renderer/apis/history/getCustomerHistory'
import Navbar from '@renderer/components/Navbar'
import { Input } from '@renderer/components/ui/inputs'
import { ScaleLoaderUI } from '@renderer/components/ui/loader'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'

const SingleCustomer = () => {
  const { name, id } = useParams()
  const [searchValue, setSearchValue] = useState('')
  const [date, setDate] = useState('')

  const {
    isPending: isGettingHistory,
    data: customerHistory,
    mutate: getHistory
  } = useGetCustomerHistory()

  useEffect(() => {
    getHistory({ customerId: id! })
  }, [])

  return (
    <>
      <Navbar currentPage={name!} prevPageLink={'/customers'} isSearchable={false} />

      {isGettingHistory ? (
        <ScaleLoaderUI minHeight={500} />
      ) : (
        <div className="container single_customer_page">
          <div className="filter_con">
            <div className="search_con">
              <Input
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </div>

            <div className="date_col">
              <div className="date_con">
                <input type="date" onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
          </div>

          {/* <DataTable
            columns={History_column}
            isClickable
            data={customerHistory ?? []}
            isLoading={isGettingHistory}
          /> */}
        </div>
      )}
    </>
  )
}

export default SingleCustomer
