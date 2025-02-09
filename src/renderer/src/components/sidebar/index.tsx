import { useReturnAllCategories } from '@renderer/apis/categories/getCategories'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  const { data: AllCategories, mutate } = useReturnAllCategories()
  const [openSubCate, setOpenSubCat] = useState(false)
  const { pathname } = useLocation()
  const naviagte = useNavigate()

  useEffect(() => {
    mutate()
    console.log(AllCategories, 'data')
  }, [])

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
                    if (i.isProducts) {
                      setOpenSubCat(!openSubCate)

                      return
                    }
                    setCurrentPage(i.name)
                    setOpenSidebar(false)
                    naviagte(`${i.path}`)
                  }}
                  className={isActive ? 'link1 active' : 'link1'}
                >
                  <p className="name_sec">
                    <span>
                      <Icons.BulletPoint className="bulletList_icon" />
                    </span>

                    {i.name}
                  </p>

                  <span className="arrow">
                    {i.isProducts && <Icons.ChevronRignht className="arrow_icon" />}
                  </span>
                </div>

                {i.isProducts && (
                  <div className={openSubCate ? 'subLinks active' : 'subLinks'}>
                    {AllCategories?.map((i, key) => {
                      const sub_isActive = pathname.includes(i.id)
                      return (
                        <div
                          onClick={() => {
                            setCurrentPage(i.name)
                            setOpenSidebar(false)
                          }}
                          key={key}
                        >
                          <Link
                            to={`${i.name}/${i.id}`}
                            className={sub_isActive ? 'link2 active' : 'link2'}
                          >
                            <span>
                              <Icons.BulletPoint className="bulletList_icon" />
                            </span>

                            {i.name}
                          </Link>
                        </div>
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
