import { ReactNode } from 'react'
import { Icons } from '../icons'
import { Overlay } from '../modal.tsx'
import './styles.scss'

type SideSheetProps = {
  children: ReactNode
  onOpenChange: (value: boolean) => void
  onOpen: boolean
  className: string
  zIndex?: number
}

const SideSheet = ({ children, onOpen, onOpenChange, className, zIndex }: SideSheetProps) => {
  return (
    <>
      <div
        className={
          onOpen ? ` sidesheet_container active ${className}` : ` sidesheet_container ${className}`
        }
        style={{
          zIndex: zIndex
        }}
      >
        <div className="close_btn" onClick={() => onOpenChange(false)}>
          <Icons.CloseIcon className="close_icon" />
        </div>

        {children}
      </div>

      <Overlay open={onOpen} onOpenChange={onOpenChange} zIndex={zIndex && zIndex - 1} />
    </>
  )
}

export default SideSheet
