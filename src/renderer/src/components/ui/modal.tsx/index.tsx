import { ReactNode } from 'react'
import { Icons } from '../icons'
import './style.scss'

type ModalProps = {
  children: ReactNode
  onOpenChange: (value: boolean) => void
  open: boolean
}

export const Modal = ({ children, onOpenChange, open }: ModalProps) => {
  return (
    <>
      <div className={open ? 'modal_main_container active' : 'modal_main_container'}>
        <div className="wrapper">
          <div className="close_btn" onClick={() => onOpenChange(false)}>
            <Icons.CloseIcon className="close_icon" />
          </div>
          {children}
        </div>
      </div>

      <Overlay open={open} onOpenChange={onOpenChange} />
    </>
  )
}

type OverlayProps = {
  onOpenChange?: (value: boolean) => void
  open: boolean
}

export const Overlay = ({ open, onOpenChange }: OverlayProps) => {
  return (
    <div
      className={open ? 'overlay_container active' : 'overlay_container'}
      onClick={() => {
        if (!onOpenChange) return
        onOpenChange(false)
      }}
    />
  )
}
