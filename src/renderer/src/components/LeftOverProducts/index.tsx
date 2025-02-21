import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { RootState } from '@renderer/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../ui/Button'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

type LeftOverProductsprops = {
  open: boolean
  onOpenChange: (value: boolean) => void
  setOpenSellLeftOverForm: (value: boolean) => void
  setLeftOverProductInfo: (value: SellLeftOverData) => void
  productData: ProductResponse
}

const LeftOverProducts = ({
  open,
  onOpenChange,
  productData,
  setLeftOverProductInfo,
  setOpenSellLeftOverForm
}: LeftOverProductsprops) => {
  const { leftOver } = productData
  const [activeProduct, setActiveProduct] = useState<number>(-1)
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const [openForm, setOpenForm] = useState(false)

  return (
    <>
      <Modal open={open} onOpenChange={onOpenChange}>
        <div className="leftOverProduct_con">
          <h2>List of incomplete Products</h2>
          <p className="sub_title">Select a product to add it to cart</p>

          <div className="box_con">
            {leftOver &&
              leftOver.map((i, key) => {
                const inCart = cartItems.find((item) => item.leftOverId === i.leftOverId)
                return (
                  <div
                    key={key}
                    className={
                      activeProduct === key
                        ? `${inCart ? 'box active in_cart' : 'box active '}`
                        : `${inCart ? 'box in_cart' : 'box'}`
                    }
                    onClick={() => setActiveProduct(key)}
                  >
                    {/* Size */}
                    {i.size && (
                      <p>
                        Size: <span>{i.size}</span>
                      </p>
                    )}

                    {/* Color */}
                    {i.color && (
                      <p>
                        Color: <span>{i.color}</span>
                      </p>
                    )}

                    {/* Design */}
                    {i.design && (
                      <p>
                        Design: <span>{i.design}</span>
                      </p>
                    )}

                    {/* products left */}
                    <div className="subproduct_sec">
                      <h4>Product left</h4>

                      {i.subproducts.map((product, key) => (
                        <p key={key}>
                          {product.name}: <span>{product.left}</span>
                        </p>
                      ))}
                    </div>

                    {/* incart indicator */}
                    {inCart && <div className="incart_indicator">In cart</div>}
                  </div>
                )
              })}
          </div>

          <div className="btns">
            <Button
              text="Proceed"
              disable={activeProduct < 0}
              onClick={() => {
                setLeftOverProductInfo(leftOver?.[activeProduct])
                setOpenSellLeftOverForm(true)
                onOpenChange(false)
              }}
            />
          </div>
        </div>
      </Modal>

      {/* {openForm && (
        <SellLeftOverForm
          open={openForm}
          onOpenChange={setOpenForm}
          data={leftOver?.[activeProduct]}
        />
      )} */}
    </>
  )
}

export default LeftOverProducts
