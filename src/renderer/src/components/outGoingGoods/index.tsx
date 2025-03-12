import OutGoingGoodsForm from '../forms/outgoingGoodsform/index.js'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

const OutGoingGoods = ({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="out_going_goods_con">
        <div className="header">
          <h2>Sell goods</h2>
          <p className="subHeader">Enter details to sell goods</p>
        </div>
        <OutGoingGoodsForm openModel={onOpenChange} />
      </div>
    </Modal>
  )
}

export default OutGoingGoods
