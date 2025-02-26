import { Outlet } from 'react-router-dom'
import './style.scss'

const Layout = () => {
  return (
    <>
      <div className="main">
        <div className="main_wrapper">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
