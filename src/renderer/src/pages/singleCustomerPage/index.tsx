import { useGetSingleCustomers } from '@renderer/apis/customer/getSingleCustomer'
import { useGetCustomerHistory } from '@renderer/apis/history/getCustomerHistory'
import Navbar from '@renderer/components/Navbar'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { Input } from '@renderer/components/ui/inputs'
import { ScaleLoaderUI } from '@renderer/components/ui/loader'
import SideSheet from '@renderer/components/ui/sideSheet'
import { DataTable } from '@renderer/components/ui/table'
import { History_column } from '@renderer/components/ui/table/columns/hsitoryColumn'
import { convertAmount, formatDate } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles.scss'

const SingleCustomer = () => {
  const { name, id } = useParams()
  const [searchValue, setSearchValue] = useState('')
  const [date, setDate] = useState('')
  const [openDropDown, setOpenDropDown] = useState(false)
  const [openPaymentHistory, setOpenPaymentHistory] = useState(false)
  const [openPayModal, setOpenPayModal] = useState(false)

  const [paymentStatus, setPaymentStatus] = useState('')

  // get customer details
  const {
    data: customer,
    mutate: getcustomer,
    isPending: isGettingCustomer
  } = useGetSingleCustomers()

  const {
    isPending: isGettingHistory,
    data: customerHistory,
    mutate: getHistory
  } = useGetCustomerHistory()

  useEffect(() => {
    if (id) {
      getcustomer({ customerId: id })
    }
  }, [id])

  useEffect(() => {
    // @ts-expect-error:undefined
    setPaymentStatus(customer?.debt > 0 ? 'outstanding' : 'settled')
  }, [customer])

  useEffect(() => {
    getHistory({ customerId: id! })
  }, [])

  return (
    <>
      <Navbar currentPage={name!} prevPageLink={'/customers'} isSearchable={false} />

      {isGettingCustomer ? (
        <ScaleLoaderUI minHeight={500} />
      ) : (
        <div className="container single_customer_page">
          <div className="page_header">
            <div className="payment_status_con">
              <span className={`status status__${paymentStatus}`}>{paymentStatus}</span>

              <h3>
                Outsanding amount: <span>{convertAmount(customer?.debt ?? 0)}</span>
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

            <div className="date_col">
              <div className="date_con">
                <input type="date" onChange={(e) => setDate(e.target.value)} />
              </div>

              <span
                className="history_icon"
                onClick={() => {
                  setOpenPaymentHistory(true)
                  setOpenDropDown(false)
                }}
              >
                <Icons.HistoryIcon className="icon" />
              </span>
            </div>
          </div>

          <DataTable
            columns={History_column}
            isClickable
            data={customerHistory ?? []}
            isLoading={isGettingHistory}
          />

          {openPaymentHistory && (
            <PaymentHistory
              open={openPaymentHistory}
              setIsOpen={setOpenPaymentHistory}
              data={customer?.paymentHistory ?? []}
            />
          )}

          {openPayModal && (
            <PayDebtModel
              open={openPayModal}
              setIsOpen={setOpenPayModal}
              debt={customer?.debt ?? 0}
            />
          )}
        </div>
      )}
    </>
  )
}

export default SingleCustomer

const PaymentHistory = ({
  data,
  open,
  setIsOpen
}: {
  data: {
    date: string
    amountPaid: number
  }[]
  open: boolean
  setIsOpen: (value: boolean) => void
}) => {
  return (
    <SideSheet onOpen={open} onOpenChange={setIsOpen} className="payment_history_con">
      <h2>Payment history</h2>

      {data.length === 0 ? (
        <div className="no_payments">
          <Icons.NoResult className="icon" />
          <p>No recent payments</p>
        </div>
      ) : (
        <div className="payments">
          {data.map((i, key) => (
            <p key={key}>
              <span>{convertAmount(i.amountPaid)}</span>
              <span>
                Paid on <b>{formatDate(i.date)}</b>
              </span>
            </p>
          ))}
        </div>
      )}
    </SideSheet>
  )
}

const PayDebtModel = ({
  open,
  setIsOpen,
  debt
}: {
  open: boolean
  setIsOpen: (value: boolean) => void
  debt: number
}) => {
  const [amount, setAmount] = useState(0)
  return (
    <AlertModal open={open} onOpenChange={setIsOpen} className="payDebt_model">
      <h2>Pay debt</h2>
      <p className="sub_txt">
        Debt: <b>{convertAmount(debt)}</b>
      </p>

      <div className="con">
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          label="Enter amount"
          type="number"
        />

        <small>
          Amount left: <b>{convertAmount(Number(debt) - Number(amount))}</b>
        </small>
      </div>

      <div className="btns">
        <Button text="Cancel" varient="outline" />
        <Button text="Proceed" disable={amount <= 0 || !amount} />
      </div>
    </AlertModal>
  )
}
