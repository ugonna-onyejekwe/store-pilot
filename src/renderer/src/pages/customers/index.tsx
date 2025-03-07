import Navbar from '@renderer/components/Navbar'
import SearchModal from '@renderer/components/searchModal'
import { Icons } from '@renderer/components/ui/icons'
import { convertAmount } from '@renderer/lib/utils'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

const Customers = () => {
  const [searchValue, setSearchValue] = useState('')
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const data = [
    {
      name: 'ugonna onyejekwe',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'outstanding',
      amountToPay: 2000000,
      customerId: '132'
    },

    {
      name: 'John  Fisher',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'Settled',
      amountToPay: 2000000,
      customerId: '132'
    },

    {
      name: 'Clerk Uchendu',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'outstanding',
      amountToPay: 2000000,
      customerId: '132'
    },
    {
      name: 'ugonna onyejekwe',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'outstanding',
      amountToPay: 2000000,
      customerId: '132'
    },

    {
      name: 'John  Fisher',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'Settled',
      amountToPay: 2000000,
      customerId: '132'
    },

    {
      name: 'Clerk Uchendu',
      lastPaymentDate: 'Feb, 13, 2025',
      paymentStatus: 'outstanding',
      amountToPay: 2000000,
      customerId: '132'
    }
  ]

  return (
    <>
      <Navbar currentPage="Customers" openSearch={setOpenSearchModal} />

      <div className="container ">
        <div className="customers_container">
          <div className="header">
            <h2>List of customers</h2>
            <p>Click customer to view detials</p>
          </div>

          <div className="box_con">
            {data.map((i, key) => (
              <Link to={`/customers/${i.customerId}/${i.name}`} key={key} className="box">
                <div className="col_1">
                  <h3>{i.name}</h3>

                  {i.paymentStatus.toLowerCase() === 'outstanding' && (
                    <p>Last payment was on {i.lastPaymentDate}</p>
                  )}
                </div>

                <div className="col_2">
                  <div>
                    <span className={`status status__${i.paymentStatus.toLowerCase()}`}>
                      {i.paymentStatus}
                    </span>
                    {i.paymentStatus.toLowerCase() === 'outstanding' && (
                      <h4>{convertAmount(i.amountToPay)}</h4>
                    )}
                  </div>

                  <div className="arrow_forward">
                    <Icons.ForwardArrow className="icon" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* PAGINATION ============ */}
          <div className="pagination">
            <p className="page_count">
              Page <b>{'1'} </b> of <b>{'10'}</b>
            </p>

            <div className="action_btns">
              <div className="back_btn btn">
                <Icons.BackArrow className="icon" />
              </div>
              <div className="forword_btn btn">
                <Icons.ForwardArrow className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH MODAL ============= */}
      <SearchModal
        placeholder={'Search customer by name'}
        open={openSearchModal}
        onOpenChange={setOpenSearchModal}
      />
    </>
  )
}

export default Customers
