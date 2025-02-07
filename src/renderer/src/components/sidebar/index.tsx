import { Link, useLocation } from 'react-router-dom'
import { Icons } from '../ui/icons'
import { Overlay } from '../ui/modal.tsx'
import { navLinks } from './links'
import './style.scss'

type SidebarProps = {
  setOpenSidebar: (value: boolean) => void
  openSidebar: boolean
  setCurrentPage: (value: string) => void
}

const Sidebar = ({ setOpenSidebar, openSidebar, setCurrentPage }: SidebarProps) => {
  const { pathname } = useLocation()

  return (
    <>
      <div className={openSidebar ? 'sidebar_main_wrapper active' : 'sidebar_main_wrapper'}>
        {/* sidebar header */}
        <div className="sidebar_header">
          <div className="logo">
            <Icons.Logo className="logo_icon" />

            <h1>
              Store<span>pilot</span>
            </h1>
          </div>

          <div className="close_icon_div" onClick={() => setOpenSidebar(false)}>
            {<Icons.CloseIcon className="close_icon" />}
          </div>
        </div>

        {/* sidebar links */}
        <div className="sidebar_links">
          {navLinks.map((i, key) => {
            const isActive = pathname === i.path

            return (
              <div key={key}>
                <div
                  onClick={() => {
                    setCurrentPage(i.name)
                    setOpenSidebar(false)
                  }}
                  className={isActive ? 'link1 active' : 'link1'}
                >
                  <Link to={i.path}>
                    <p className="name_sec">
                      <span>
                        <Icons.BulletPoint className="bulletList_icon" />
                      </span>

                      {i.name}
                    </p>

                    <span className="arrow">
                      {i.subLinks && <Icons.ChevronRignht className="arrow_icon" />}
                    </span>
                  </Link>
                </div>

                {i.subLinks && (
                  <div className="subLinks">
                    {i.subLinks.map((i, key) => {
                      const sub_isActive = pathname.includes(i.path)
                      return (
                        <Link
                          to={i.path}
                          key={key}
                          className={sub_isActive ? 'link2 active' : 'link2'}
                        >
                          <span>
                            <Icons.BulletPoint className="bulletList_icon" />
                          </span>

                          {i.name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Overlay onOpenChange={setOpenSidebar} open={openSidebar} />
    </>
  )
}

export default Sidebar
