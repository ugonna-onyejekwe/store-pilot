import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../ui/icons'
import './styles.scss'

interface DashboardLinkBoxProps {
  label: string
  icon: ReactNode
  link: string
  icon_bg: string
}

const DashboardLinkBox = ({ label, icon, link, icon_bg }: DashboardLinkBoxProps) => {
  return (
    <Link to={link} className="dashboardLinkBox">
      <div>
        <div
          className="icon_box"
          style={{
            background: icon_bg
          }}
        >
          {icon}
        </div>
        <p>{label}</p>
      </div>

      <div className="arrow_con">
        <Icons.ForwardArrow className="forward_icon" />
      </div>
    </Link>
  )
}

export default DashboardLinkBox
