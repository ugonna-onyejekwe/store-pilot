import Button from '../ui/Button/index.js'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

type ProductDetailsModal = {
  open: boolean
  onOpenChange: (value: boolean) => void
}

const ProductDetailsModal = ({ open, onOpenChange }: ProductDetailsModal) => {
  const product = {
    modelId: '27',
    subcatId: '822',
    subCategory: 'by 4',
    model: '2444',
    quantity: '300',
    colors: [
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      },
      {
        name: 'red',
        id: '7272',
        quantity: 600
      }
    ],
    designs: [
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      },
      {
        desdingId: '1233',
        name: 'S7',
        quantity: '300'
      }
    ],
    cartoons: 10
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="product_details_modal">
        <h2>Product details</h2>
        <div className="txt_con">
          <p className="txt">
            Category: <b>{product.subCategory}</b>
          </p>

          <p className="txt">
            Model: <b>{product.model}</b>
          </p>

          <p className="txt">
            Quantity left: <b>{product.quantity}</b>
          </p>

          <p className="txt">
            Cartoons per product: <b>{product.cartoons}</b>
          </p>
        </div>

        {/* Available colors */}
        {product.colors?.length > 0 && (
          <div className="available_color_con">
            <h3>Avaliable colors:</h3>

            <div className="con">
              {product.colors?.map((color, key) => {
                return (
                  <span key={key}>
                    <b>• {color.name}:</b> <b>{color.quantity} </b>
                    in stock
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Available designs */}
        {product.designs?.length > 0 && (
          <div className="available_designs_con">
            <h3>Avaliable designs/materials:</h3>

            <div className="con">
              {product.designs?.map((design, key) => (
                <span key={key}>
                  <b>• {design.name}:</b> <b>{design.quantity} </b>in stock
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="btns">
          <Button text="Edit product" varient="outline" />

          <Button text="Sell product" />
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal
