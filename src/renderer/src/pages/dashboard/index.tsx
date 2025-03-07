import DashboardLinkBox from '@renderer/components/DashboardLinkBox'
import Navbar from '@renderer/components/Navbar'
import { Icons } from '@renderer/components/ui/icons'
import { formatDateFromTimestamp } from '@renderer/lib/utils'
import { useEffect, useState } from 'react'
import './style.scss'

const Dashboard = () => {
  const [time, setTime] = useState('')

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

  return (
    <>
      {/* === NAVBAR SECTION STARTS ==== */}
      <Navbar currentPage="dashboard" isDashboard />
      {/* === NAVBAR SECTION ENDS ==== */}

      <div className="dasboard_page container">
        {/* first wrapper */}
        <div className="wrapper_1">
          {/* Dispaly time container  */}
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
            <DashboardLinkBox
              label="Incoming goods"
              icon={<Icons.AddProductIcon className="icon" />}
              link="/icoming-goods"
              icon_bg="#f293054c"
            />
            <DashboardLinkBox
              label="Out going goods"
              icon={<Icons.RemoveProductIcon className="icon" />}
              link="/out-going-goods"
              icon_bg="#f2de0564"
            />
            <DashboardLinkBox
              label="Goods"
              icon={<Icons.GoodsIcons className="icon" />}
              link="/goods"
              icon_bg="#3c9a5f38"
            />
            <DashboardLinkBox
              label="Customers"
              icon={<Icons.usersIcon className="icon" />}
              link="/customers"
              icon_bg="#ae40f75d"
            />
          </div>
        </div>

        {/* second wrapper */}
        <div className="wrapper_2">
          <DashboardLinkBox
            label="Return goods"
            icon={<Icons.ReturnedGoods className="icon" />}
            link="/return-goods"
            icon_bg="#f740c65a"
          />
          <DashboardLinkBox
            label="Pending payments"
            icon={<Icons.MoneyIcon className="icon" />}
            link="/pending-payments"
            icon_bg="#f40b073a"
          />
          <DashboardLinkBox
            label="History"
            icon={<Icons.HistoryIcon className="icon" />}
            link="/history"
            icon_bg="#fc900252"
          />
          <DashboardLinkBox
            label="Admin"
            icon={<Icons.SettingsIcon className="icon" />}
            link="/admin"
            icon_bg="#419cfe50"
          />
        </div>
      </div>
    </>
  )
}

export default Dashboard
