import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import { cartItem } from '@renderer/store/cartSlice'
import { useEffect } from 'react'
import { Icons } from '../ui/icons'
import { ScaleLoaderUI } from '../ui/loader'

const CartItem = ({
  category,
  model,
  color,
  size,
  design,
  typeOfSale,
  subproduct,
  quantity,
  productId
}: cartItem) => {
  const { mutate, isPending, data } = useReturnSingleProduct()

  useEffect(() => {
    mutate({ productId })
  }, [])

  const colorName = data?.colors.find((i) => i.id === color)
  const sizeName = data?.sizes.find((i) => i.id === size)
  const designName = data?.designs.find((i) => i.id === design)

  return (
    <>
      {isPending ? (
        <ScaleLoaderUI minHeight={250} />
      ) : (
        <div className="cart_item">
          <div>
            <div className="general_con">
              <p>
                Category: <span>{category.name}</span>
              </p>

              {typeOfSale.trim() !== 'Sell Part' && (
                <p>
                  Quantity:
                  <span>{quantity}</span>
                </p>
              )}

              {model && (
                <p>
                  Model:<span>{model}</span>
                </p>
              )}

              {size && (
                <p>
                  Size: <span>{sizeName?.name}</span>
                </p>
              )}

              {color && (
                <p>
                  Size: <span>{colorName?.name}</span>
                </p>
              )}

              {design && (
                <p>
                  Size: <span>{designName?.name}</span>
                </p>
              )}
            </div>

            {typeOfSale.trim() === 'Sell Part' && (
              <div className="Subproduct_con">
                <h4>Subproducts</h4>

                <div className="subproduct_box">
                  {subproduct.map((i, key) => {
                    return (
                      <p key={key}>
                        {i.name}: <span>{i.sellQuantity}</span>
                      </p>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="action_btns">
            {/* <span>
              <Icons.EyeIcon className="eye_icon" />
            </span> */}

            <span>
              <Icons.DeleteIcon className="delete_icon" />
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default CartItem
