import { HistoryResponse, useReturnAllHistory } from '@renderer/apis/history/getHistory'
import EditPaymentModel from '@renderer/components/EditPaymentModal'
import EditSupplyModel from '@renderer/components/editSupplyModel'
import Navbar from '@renderer/components/Navbar'
import { Icons } from '@renderer/components/ui/icons'
import { convertAmount, formatDate, formatDateFromTimestamp } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import './style.scss'

const Dashboard = () => {
  const [time, setTime] = useState('')
  const [openEditSupplyModel, setOpenEditSupplyModel] = useState(false)
  const [openEditPaymentModel, setOpenEditPaymentModel] = useState(false)
  const [ActiveHistory, setActiveHistory] = useState<HistoryResponse>()
  const [activeCheckoutId, setActiveCheckoutId] = useState('')
  const targetDate = new Date(Date.now())
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())
  const endOfDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate() + 1
  )

  const { mutate: fetchHistry, data: history, isPending } = useReturnAllHistory()

  // Use efffect that sets time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit', // Or 'numeric'
          minute: '2-digit', // Or 'numeric'
          hour12: true // Or false
        })
      )
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Use effect for fecthinh data
  useEffect(() => {
    fetchHistry()
  }, [])

  const pendingSupplies = history?.filter((i) => i.checkoutInfo.supplyStatus === 'Not supplied')

  const pendingPayments = history?.filter((i) => i.checkoutInfo.paymentStatus !== 'Full payment')

  const todaySales = history?.filter(
    (i) =>
      new Date(i.checkoutInfo.createdAt) >= startOfDay &&
      new Date(i.checkoutInfo.createdAt) < endOfDay
  )

  const suppliedGood = todaySales?.filter((i) => i.checkoutInfo.supplyStatus !== 'Not supplied')

  return (
    <>
      {/* === NAVBAR SECTION STARTS ==== */}
      <Navbar currentPage="dashboard" isDashboard />
      {/* === NAVBAR SECTION ENDS ==== */}

      <div className="dasboard_page container">
        {/* info_con */}
        <div className="info_wrapper">
          <div className="time_con">
            <p className="txt">Hello,</p>
            <h1>
              {time} <span>{formatDateFromTimestamp(Date.now())}</span>
            </h1>

            <p className="sub_txt">
              Welcome back online!
              <br /> Let's make today another successful sales day.
            </p>
          </div>

          {/* box_con */}
          <div className="box_con">
            {/* box_con 1*/}
            <div className="box sales_box">
              <div className="item_wrapper">
                <div className="txt">
                  <span className="icon_con">
                    <Icons.SalesIcon className="icon" />
                  </span>

                  <h3>Today Sales</h3>
                </div>

                <div className="number">
                  <h1>{todaySales?.length}</h1>
                </div>
              </div>
            </div>

            {/* box_con 2 */}
            <div className="box supplied_box">
              <div className="item_wrapper">
                <div className="txt">
                  <span className="icon_con">
                    <Icons.SuppliedIcon className="icon" />
                  </span>

                  <h3>Supplied Goods today</h3>
                </div>

                <div className="number">
                  <h1>{suppliedGood?.length}</h1>
                </div>
              </div>
            </div>

            {/* box_con 3*/}
            <div className="box not_supplied_box">
              <div className="item_wrapper">
                <div className="txt">
                  <span className="icon_con">
                    <Icons.NotSuppliedIcon className="icon" />
                  </span>

                  <h3>Not Supplied</h3>
                </div>

                <div className="number">
                  <h1>{pendingSupplies?.length}</h1>
                </div>
              </div>
            </div>

            {/* box_con 4*/}
            <div className="box returned_goods_box">
              <div className="item_wrapper">
                <div className="txt">
                  <span className="icon_con">
                    <Icons.MoneyIcon className="icon" />
                  </span>

                  <h3>Incomplete payments</h3>
                </div>

                <div className="number">
                  <h1>{pendingPayments?.length}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* table */}
        <div className="table_section">
          <div className="pending_supplies ">
            <h2>Pending supplies</h2>

            <div className="box_con">
              {pendingSupplies?.length === 0 || isPending ? (
                <h1 className="no_data_text">No pending supplies today.</h1>
              ) : (
                pendingSupplies?.map((i, key) => (
                  <div className="box" key={key}>
                    <p>
                      {"Customer's Name: "}
                      <span>{i.checkoutInfo.customerName}</span>
                    </p>

                    {i.checkoutInfo.customerPhoneNumber !== '' && (
                      <p>
                        {"Customer's phone number: "}
                        <span>{i.checkoutInfo.customerPhoneNumber}</span>
                      </p>
                    )}

                    <p>
                      Supply location: <span>{i.checkoutInfo.supplyLocation}</span>
                    </p>

                    <div className="btns">
                      <span
                        className={
                          `status ` + `status__` + i.checkoutInfo.supplyStatus.toLowerCase()
                        }
                      >
                        {i.checkoutInfo.supplyStatus}
                      </span>

                      <span
                        className="icon_con"
                        onClick={() => {
                          setActiveCheckoutId(i.checkoutInfo.checkoutId)
                          setOpenEditSupplyModel(true)
                        }}
                      >
                        <Icons.EditIcon className="icon" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="incomplete_payments_table ">
            <h2>Incomplete payments</h2>

            <div className="box_con">
              {pendingPayments?.length === 0 || isPending ? (
                <h1 className="no_data_text">No pending payments today.</h1>
              ) : (
                pendingPayments?.map((i, key) => (
                  <div key={key} className="box">
                    <p>
                      {"Customer's Name: "}
                      <span>{i.checkoutInfo.customerName}</span>
                    </p>

                    <p>
                      {"Customer's phone number: "}
                      <span>{i.checkoutInfo.customerPhoneNumber}</span>
                    </p>

                    <p>
                      {'Checkout date: '}
                      <span>{formatDate(i.checkoutInfo.createdAt)}</span>
                    </p>

                    <p>
                      Selling price: <span>{convertAmount(i.checkoutInfo.sellingPrice)}</span>
                    </p>

                    <p>
                      deposit: <span>{convertAmount(i.checkoutInfo.amountPaid)}</span>
                    </p>

                    <div className="btns">
                      <span
                        className={
                          `status ` + `status__` + i.checkoutInfo.paymentStatus.toLowerCase()
                        }
                      >
                        {i.checkoutInfo.paymentStatus}
                      </span>

                      <span
                        className="icon_con"
                        onClick={() => {
                          setActiveHistory(i)
                          setOpenEditPaymentModel(true)
                        }}
                      >
                        <Icons.EditIcon className="icon" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {openEditSupplyModel && (
        <EditSupplyModel
          open={openEditSupplyModel}
          onOpenChange={setOpenEditSupplyModel}
          checkoutId={activeCheckoutId}
          reFetchHistry={fetchHistry}
        />
      )}

      {openEditPaymentModel && (
        <EditPaymentModel
          open={openEditPaymentModel}
          onOpenChange={setOpenEditPaymentModel}
          data={ActiveHistory!}
          reFetchHistry={fetchHistry}
        />
      )}
    </>
  )
}

export default Dashboard
