import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

interface AdminLinkBoxProps {
  link?: string
  handleClick?: () => void
  label: string
  subLabel: string
  icon: ReactNode
  className?: string
}

const AdminLinkBox = ({
  link,
  handleClick,
  label,
  subLabel,
  icon,
  className
}: AdminLinkBoxProps) => {
  return (
    <>
      {link ? (
        <Link to={link} className={`admin_link_box ${className}`}>
          <div className="icon_con">{icon}</div>

          <h4>{label}</h4>
          <p className="txt">{subLabel}</p>
        </Link>
      ) : (
        <div onClick={handleClick} className={`admin_link_box ${className}`}>
          <div className="icon_con">{icon}</div>

          <h4>{label}</h4>
          <p className="txt">{subLabel}</p>
        </div>
      )}
    </>
  )
}

export default AdminLinkBox
