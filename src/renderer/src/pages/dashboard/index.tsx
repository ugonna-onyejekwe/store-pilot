import { Icons } from '@renderer/components/ui/icons'
import { DataTable } from '@renderer/components/ui/table'
import { Supply_column } from '@renderer/components/ui/table/columns/supplyColumn'
import { formatDateFromTimestamp } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import './style.scss'

const Dashboard = () => {
  const [time, setTime] = useState('')
  const pendingSupplies = []

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
  return (
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
                <h1>80</h1>
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

                <h3>Supplied Goods</h3>
              </div>

              <div className="number">
                <h1>100</h1>
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
                <h1>50</h1>
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
                <h1>5</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="table_section">
        <div className="pending_supplies_tables table">
          <h2>Pending supplies</h2>

          {/* {pendingSupplies.length === 0 ? (
            <h1 className="no_data_text">No pending supplies today.</h1>
          ) : ( */}
          <DataTable columns={Supply_column} isLoading={false} data={[]} isClickable />
          {/* // )} */}
        </div>

        <div className="incomplete_payments_table table">
          <h2>Incomplete payments</h2>

          {/* {pendingSupplies.length === 0 ? (
            <h1 className="no_data_text">No pending payments today.</h1>
          ) : ( */}
          <DataTable columns={Supply_column} isLoading={false} data={[]} isClickable />
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
