import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../sidebar'
import './style.scss'

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [currentPage, setCurrentPage] = useState('Dashboard')

  return (
    <div className="main">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        setCurrentPage={setCurrentPage}
      />

      <div className="main_wrapper">
        <Navbar setOpenSidebar={setOpenSidebar} currentPage={currentPage} />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
