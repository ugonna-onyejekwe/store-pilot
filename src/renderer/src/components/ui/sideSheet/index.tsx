import { ReactNode } from 'react'
import { Icons } from '../icons'
import { Overlay } from '../modal.tsx'
import './styles.scss'

type SideSheetProps = {
  children: ReactNode
  onOpenChange: (value: boolean) => void
  onOpen: boolean
  className: string
}

const SideSheet = ({ children, onOpen, onOpenChange, className }: SideSheetProps) => {
  return (
    <>
      <div
        className={
          onOpen ? ` sidesheet_container active ${className}` : ` sidesheet_container ${className}`
        }
      >
        <div className="close_btn" onClick={() => onOpenChange(false)}>
          <Icons.CloseIcon className="close_icon" />
        </div>

        {children}
      </div>

      <Overlay open={onOpen} onOpenChange={onOpenChange} />
    </>
  )
}

export default SideSheet
