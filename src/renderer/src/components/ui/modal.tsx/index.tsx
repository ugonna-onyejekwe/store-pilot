import { ReactNode, useRef } from 'react'
import { Icons } from '../icons'
import './style.scss'

type ModalProps = {
  children: ReactNode
  onOpenChange: (value: boolean) => void
  open: boolean
  zIndex?: number
}

export const Modal = ({ children, onOpenChange, open, zIndex }: ModalProps) => {
  const innerWrapper = useRef(null)

  const handleClick = (e) => {
    // @ts-expect-error:undefined
    if (innerWrapper.current?.contains(e.target) === false) {
      onOpenChange(false)
    }
  }

  return (
    <>
      <div
        className={open ? 'modal_main_container active' : 'modal_main_container'}
        style={{
          zIndex: zIndex
        }}
        onClick={handleClick}
      >
        <div className="wrapper" ref={innerWrapper}>
          <div className="close_btn" onClick={() => onOpenChange(false)}>
            <Icons.CloseIcon className="close_icon" />
          </div>
          {children}
        </div>
      </div>

      <Overlay open={open} onOpenChange={onOpenChange} zIndex={zIndex && zIndex - 1} />
    </>
  )
}

type OverlayProps = {
  onOpenChange?: (value: boolean) => void
  open: boolean
  zIndex?: number
}

export const Overlay = ({ open, onOpenChange, zIndex }: OverlayProps) => {
  return (
    <div
      className={open ? 'overlay_container active' : 'overlay_container'}
      onClick={() => {
        if (!onOpenChange) return
        onOpenChange(false)
      }}
      style={{
        zIndex: zIndex
      }}
    />
  )
}
