import { useNavigate } from 'react-router-dom'
import { Icons } from '../ui/icons'
import { Overlay } from '../ui/modal.tsx'
import './styles.scss'

interface SearchModalProps {
  placeholder: string
  open: boolean
  onOpenChange: (value: boolean) => void
  zIndex?: number
  linkParams1?: string
  linkParams2?: string
  link?: string
  displayTxt: string
  searchData: any[]
  handleClick?: (value: any) => void
  searchValue: string
  setSearchValue: (value: string) => void
}

const SearchModal = ({
  placeholder,
  open,
  onOpenChange,
  zIndex,
  linkParams1,
  linkParams2,
  link,
  searchData,
  displayTxt,
  handleClick,
  searchValue,
  setSearchValue
}: SearchModalProps) => {
  const navigate = useNavigate()
  return (
    <>
      <div
        className={open ? 'search_modal_container active' : 'search_modal_container'}
        style={{
          zIndex: zIndex
        }}
      >
        <div className="col_1">
          <Icons.SearchIcon className="search_icon" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
          />
          <span className="close_icon_con" onClick={() => onOpenChange(false)}>
            <Icons.CloseIcon className="close_icon" />
          </span>
        </div>

        <div className="col_2">
          {searchData.length === 0 && searchValue === '' ? (
            <div className="No_search_yet"></div>
          ) : searchData.length === 0 && searchValue !== '' ? (
            <div className="no_result">
              <Icons.NoResult className="icon" />

              <p>
                No Result for <b> {searchValue}</b>
              </p>
            </div>
          ) : (
            <div className="search_result">
              {searchData.map((i, key) => (
                <p
                  key={key}
                  onClick={() => {
                    if (handleClick) {
                      handleClick(i)

                      return
                    }

                    linkParams1 && !linkParams2 && navigate(`/${link}/${i[linkParams1]}}`)

                    linkParams1 &&
                      linkParams2 &&
                      navigate(`/${link}/${i[linkParams1]}/${i[linkParams2]}`)
                  }}
                >
                  {i[displayTxt]}

                  <span className="forward_btn">{<Icons.ForwardArrow className="icon" />}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <Overlay open={open} onOpenChange={onOpenChange} zIndex={zIndex && zIndex - 1} />
    </>
  )
}

export default SearchModal
