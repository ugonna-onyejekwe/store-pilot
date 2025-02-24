import { ReactNode } from 'react'
import { Icons } from '../icons/index.js'
import { Overlay } from '../modal.tsx'
import './styles.scss'

type AlertModalProps = {
  open: boolean
  onOpenChange: (value: boolean) => void
  children: ReactNode
  className?: string
  isCloseable?: boolean
  zIndex?: number
}

const AlertModal = ({
  open,
  onOpenChange,
  children,
  className,
  isCloseable = true,
  zIndex
}: AlertModalProps) => {
  return (
    <>
      <div
        className={
          open ? `${className} AlertModal_container active` : `${className} AlertModal_container`
        }
        style={{
          zIndex: zIndex
        }}
      >
        {isCloseable && (
          <div className="close_btn" onClick={() => onOpenChange(false)}>
            <Icons.CloseIcon className="close_icon" />
          </div>
        )}

        {children}
      </div>

      <Overlay
        open={open}
        onOpenChange={isCloseable ? onOpenChange : () => {}}
        zIndex={zIndex && zIndex - 1}
      />
    </>
  )
}

export default AlertModal
