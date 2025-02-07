import AuthProvider from '@renderer/provider/authprovider'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../sidebar'

const AdminLayout = () => {
  const { pathname } = useLocation()
  const currentroute = pathname.split('/').filter(Boolean)[0]

  const [openSidebar, setOpenSidebar] = useState(false)
  const [currentPage, setCurrentPage] = useState(currentroute)

  return (
    <div className="main">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        setCurrentPage={setCurrentPage}
      />

      <div className="admin_layout_container">
        <Navbar setOpenSidebar={setOpenSidebar} currentPage={currentPage} />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </div>
  )
}

export default AdminLayout
