import { useGetCustomers } from '@renderer/apis/customer/getCustomers'
import Navbar from '@renderer/components/Navbar'
import SearchModal from '@renderer/components/searchModal'
import { Icons } from '@renderer/components/ui/icons'
import { ScaleLoaderUI } from '@renderer/components/ui/loader'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Customers = () => {
  const [searchValue, setSearchValue] = useState('')
  const [openSearchModal, setOpenSearchModal] = useState(false)

  const [startPage, setStartPage] = useState(0)
  const [endPage, setEndPage] = useState(10)

  const { data: customers, mutate: getcustomers, isPending: isGettingCustomers } = useGetCustomers()

  useEffect(() => {
    getcustomers({})
  }, [])

  return (
    <>
      <Navbar currentPage="Customers" openSearch={setOpenSearchModal} />

      <div className="container ">
        <div className="customers_container">
          <div className="header">
            <h2>List of customers</h2>
            <p>Click customer to view detials</p>
          </div>
          {isGettingCustomers ? (
            <div
              style={{
                marginTop: 30
              }}
            >
              <ScaleLoaderUI minHeight={500} />
            </div>
          ) : customers?.length === 0 ? (
            <div className="no_customer">
              <h1>No saved customers yet</h1>
            </div>
          ) : (
            <>
              <div className="box_con">
                {customers?.slice(startPage, endPage).map((i, key) => {
                  const paymentStatus = i.debt > 0 ? 'outstanding' : 'settled'
                  return (
                    <Link to={`/customers/${i.id}/${i.name}`} key={key} className="box">
                      <div className="col_1">
                        <h3>{i.name}</h3>

                        {i.debt > 0 && <p>Last payment was on {formatDate(i.lastPaymentDate)}</p>}
                      </div>

                      <div className="col_2">
                        <div>
                          <span className={`status status__${paymentStatus}`}>{paymentStatus}</span>

                          {paymentStatus.toLowerCase() === 'outstanding' && (
                            <h4>{convertAmount(i.debt)}</h4>
                          )}
                        </div>

                        <div className="arrow_forward">
                          <Icons.ForwardArrow className="icon" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* PAGINATION ============ */}
              {/* @ts-expect-error:undefined */}
              {customers?.length > 10 && (
                <div className="pagination">
                  <p className="page_count">
                    Page <b>{startPage + 1} </b> of <b>{endPage}</b>
                  </p>

                  <div className="action_btns">
                    <button
                      className="back_btn btn"
                      disabled={startPage <= 0}
                      onClick={() => {
                        setStartPage(startPage - 9)
                        setEndPage(endPage - 10)
                      }}
                    >
                      <Icons.BackArrow className="icon" />
                    </button>
                    <button
                      className="forword_btn btn"
                      /* @ts-expect-error:undefined */
                      disabled={endPage >= customers?.length}
                      onClick={() => {
                        setStartPage(startPage + 9)
                        setEndPage(endPage + 10)
                      }}
                    >
                      <Icons.ForwardArrow className="icon" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* SEARCH MODAL ============= */}
      <SearchModal
        placeholder={'Search customer by name'}
        open={openSearchModal}
        onOpenChange={setOpenSearchModal}
        searchData={
          searchValue === ''
            ? []
            : (customers?.filter((i) =>
                i.name.toLowerCase().startsWith(searchValue.toLowerCase())
              ) ?? [])
        }
        displayTxt="name"
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        link="customers"
        linkParams1="id"
        linkParams2="name"
      />
    </>
  )
}

export default Customers
