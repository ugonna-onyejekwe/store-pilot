import { ProductResponse } from '@renderer/apis/products/getSingleProduct.js'
import OutGoingGoodsForm from '../forms/outgoingGoodsform/index.js'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

const OutGoingGoods = ({
  open,
  onOpenChange,
  data
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  data?: ProductResponse
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="out_going_goods_con">
        <div className="header">
          <h2>Sell goods</h2>
          <p className="subHeader">Enter details to sell goods</p>
        </div>
        <OutGoingGoodsForm openModel={onOpenChange} selectedProductData={data} />
      </div>
    </Modal>
  )
}

export default OutGoingGoods
