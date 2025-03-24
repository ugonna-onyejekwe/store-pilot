import { cartItem } from '@renderer/store/cartSlice'

const CartItem = ({
  category,
  model,
  color,
  size,
  design,
  typeOfSale,
  subproducts,
  quantity,
  productId,
  index
}: cartItem & { index: number }) => {
  console.log(
    category,
    model,
    color,
    size,
    design,
    typeOfSale,
    subproducts,
    quantity,
    productId,
    index
  )

  return <div>cart item</div>
  // const { mutate, isPending, data } = useReturnSingleProduct()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   mutate({ productId })
  // }, [])

  // const colorName = data?.colors.find((i) => i.id === color)
  // const sizeName = data?.sizes.find((i) => i.id === size)
  // const designName = data?.designs.find((i) => i.id === design)

  // return (
  //   <>
  //     {isPending ? (
  //       <ScaleLoaderUI minHeight={250} />
  //     ) : (
  //       <div className="cart_item">
  //         <div>
  //           <div className="general_con">
  //             <p>
  //               Category: <span>{category.name}</span>
  //             </p>

  //             {model && (
  //               <p>
  //                 Model:<span>{model}</span>
  //               </p>
  //             )}

  //             {typeOfSale.trim() !== 'sell part' && (
  //               <p>
  //                 Quantity:
  //                 <span>{quantity}</span>
  //               </p>
  //             )}

  //             {size && (
  //               <p>
  //                 Size: <span>{typeOfSale.trim() === 'sell leftOver' ? size : sizeName?.name}</span>
  //               </p>
  //             )}

  //             {color && (
  //               <p>
  //                 Colour:{' '}
  //                 <span>{typeOfSale.trim() === 'sell leftOver' ? color : colorName?.name}</span>
  //               </p>
  //             )}

  //             {design && (
  //               <p>
  //                 Design:{' '}
  //                 <span>{typeOfSale.trim() === 'sell leftOver' ? design : designName?.name}</span>
  //               </p>
  //             )}
  //           </div>

  //           {typeOfSale.trim() === 'sell part' && (
  //             <div className="Subproduct_con">
  //               <h4>Subproducts</h4>

  //               <div className="subproduct_box">
  //                 {subproducts.map((i, key) => {
  //                   return (
  //                     <p key={key}>
  //                       {i.name}: <span>{i.sellQuantity}</span>
  //                     </p>
  //                   )
  //                 })}
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         <div className="action_btns">
  //           <span onClick={() => dispatch(removeFromCart(index))}>
  //             <Icons.DeleteIcon className="delete_icon" />
  //           </span>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // )
}

export default CartItem
