import AuthProvider from '@renderer/provider/authprovider'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className="main">
      <div className="admin_layout_container">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </div>
    </div>
  )
}

export default AdminLayout
