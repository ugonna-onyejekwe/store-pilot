import { useState } from 'react'
import { Icons } from '../ui/icons'
import { Overlay } from '../ui/modal.tsx'
import './styles.scss'

interface SearchModalProps {
  placeholder: string
  open: boolean
  onOpenChange: (value: boolean) => void
  zIndex?: number
}

const SearchModal = ({ placeholder, open, onOpenChange, zIndex }: SearchModalProps) => {
  const [inputValue, setInputValue] = useState('')
  const searchData = [
    'ugonna 12',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123',
    'ugonna 123'
  ]
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
          />
          <span className="close_icon_con" onClick={() => onOpenChange(false)}>
            <Icons.CloseIcon className="close_icon" />
          </span>
        </div>

        <div className="col_2">
          {searchData.length === 0 ? (
            <div className="Not_search yet"></div>
          ) : searchData.length === 0 && inputValue !== '' ? (
            <div className="no_search_result"></div>
          ) : (
            <div className="search_result">
              {searchData.map((i, key) => (
                <p key={key}>
                  {i}

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
