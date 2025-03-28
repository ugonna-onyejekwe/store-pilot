import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import Button from '../ui/Button/index.js'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

type LeftOverProductsprops = {
  open: boolean
  onOpenChange: (value: boolean) => void
  productData: ProductResponse
}

const LeftOverProducts = ({ open, onOpenChange, productData }: LeftOverProductsprops) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="left_over_con">
        <h1>Left overs</h1>
        <p className="sub_header">These are products that some of there parts are sold.</p>

        <div className="product_container">
          {[...new Array(5)]?.map((i, key) => (
            <div key={key} className="left_over">
              <div className="col">
                <p>
                  Colour: <span>red</span>
                </p>
                <p>
                  Design: <span>red</span>
                </p>
              </div>
              <div className="con">
                <h3>Sub-products</h3>

                <div className="col">
                  <p>• chair - 1</p>
                  <p>• chair - 1</p>
                  <p>• chair - 1</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="btns">
          <Button text="Sell" />
        </div>
      </div>
    </Modal>
  )
}

export default LeftOverProducts
