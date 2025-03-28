import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import { getSelectedColorName, getSelectedDesignName } from '@renderer/lib/hooks'
import { cartItem, removeFromCart } from '@renderer/store/cartSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Icons } from '../ui/icons'
import { ScaleLoaderUI } from '../ui/loader'

const CartItem = ({
  categoryId,
  subcategory,
  model,
  subproducts,
  color,
  design,
  quantity,
  productId,
  sellType,
  index
}: cartItem & { index: number }) => {
  const { mutate, isPending, data } = useReturnSingleProduct()
  const dispatch = useDispatch()

  useEffect(() => {
    mutate({ productId })
  }, [])

  return (
    <>
      {isPending ? (
        <ScaleLoaderUI minHeight={250} />
      ) : (
        <div className="cart_item">
          <div>
            <div className="general_con">
              <p>
                Category: <span>{data?.categoryName}</span>
              </p>

              {model && (
                <p>
                  Model:<span>{data?.model}</span>
                </p>
              )}

              {sellType.trim() !== 'part' && (
                <p>
                  Quantity:
                  <span>{quantity}</span>
                </p>
              )}

              {data?.hasSubCategory && (
                <p>
                  Sub-category: <span>{subcategory}</span>
                </p>
              )}

              {data?.hasColors && (
                <p>
                  Colour: <span>{getSelectedColorName(data!, color)}</span>
                </p>
              )}

              {data?.hasDesigns && (
                <p>
                  Design: <span>{getSelectedDesignName(data!, color, design)}</span>
                </p>
              )}
            </div>

            {sellType.trim() === 'part' && (
              <div className="Subproduct_con">
                <h4>Subproducts</h4>

                <div className="subproduct_box">
                  {subproducts.map((i, key) => {
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
            <span onClick={() => dispatch(removeFromCart(index))}>
              <Icons.DeleteIcon className="delete_icon" />
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default CartItem
