import { useReturnSingleCategory } from '@renderer/apis/categories/getSingleCategory'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import SellLeftOverForm from './forms/sellLeftOverForm'
import LeftOverProducts from './LeftOverProducts'
import ProductDetailsModal from './productdetailsModal'
import SellProductModal from './sellProductModal.tsx'
import Button from './ui/Button'
import { Icons } from './ui/icons'
import { ScaleLoaderUI } from './ui/loader'

type ProductBoxProps = {
  data: ProductResponse
}

const ProductBox = ({ data }: ProductBoxProps) => {
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [isSellingProduct, setIsSellingProduct] = useState(false)
  const [openleftOvers, setOpenleftOvers] = useState(false)
  const [leftOverProductInfo, setLeftOverProductInfo] = useState<SellLeftOverData>()
  const [openSellLeftOverForm, setOpenSellLeftOverForm] = useState(false)

  const { data: categoryData, isPending, mutateAsync } = useReturnSingleCategory()

  useEffect(() => {
    mutateAsync({ id: data.category.id })
  }, [])

  const availableSizes = categoryData?.hasSize ? data.sizes.filter((i) => i.quantity > 0) : []
  const availableColor = categoryData?.hasColor ? data.colors.filter((i) => i.quantity > 0) : []
  const availableDesigns = categoryData?.hasDesign ? data.designs.filter((i) => i.quantity > 0) : []

  return (
    <>
      <motion.div
        variants={animateY}
        initial="initial"
        animate="animate"
        exit="exit"
        className="detail_box"
      >
        {isPending ? (
          <ScaleLoaderUI minHeight={250} />
        ) : (
          <>
            <div className="txt_con">
              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Category: <b>{data.category.name}</b>
                </li>
              </p>

              {categoryData?.hasModel && (
                <p className="txt">
                  <small>
                    <Icons.BulletPoint2 className="bullet_icon" />
                  </small>

                  <li>
                    Model: <b>{data.model}</b>
                  </li>
                </p>
              )}

              <p className="txt">
                <small>
                  <Icons.BulletPoint2 className="bullet_icon" />
                </small>

                <li>
                  Quantity left: <b>{data.totalQuantity}</b>
                </li>
              </p>

              {categoryData?.hasModel && (
                <p className="txt">
                  <small>
                    <Icons.BulletPoint2 className="bullet_icon" />
                  </small>

                  <li>
                    Cartoons per product: <b>{data.cartoonsPerProduct}</b>
                  </li>
                </p>
              )}
            </div>

            {/* Available sizes */}
            {categoryData?.hasSize && (
              <div className="available_color_con">
                <h3>Avaliable Sizes:</h3>

                {availableColor.length === 0 ? (
                  <h5>No sizes left</h5>
                ) : (
                  <div className="con">
                    {availableSizes.map((color, key) => {
                      return <span key={key}>• {color.name}</span>
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Available colors */}
            {categoryData?.hasColor && (
              <div className="available_color_con">
                <h3>Avaliable colors:</h3>

                {availableColor.length === 0 ? (
                  <h5>No colours left</h5>
                ) : (
                  <div className="con">
                    {availableColor.map((color, key) => {
                      return <span key={key}>• {color.name}</span>
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Available designs */}
            {categoryData?.hasDesign && (
              <div className="available_designs_con">
                <h3>Avaliable designs/materials:</h3>

                {availableDesigns.length === 0 ? (
                  <h5>No designs left</h5>
                ) : (
                  <div className="con">
                    {availableDesigns.map((design, key) => (
                      <span key={key}>• {design.name}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="btns">
              <button className="view_btn" onClick={() => setShowProductDetails(true)}>
                <Icons.EyeIcon className="eye_icon" />
              </button>

              <Button
                disable={data.totalQuantity < 1}
                text={data.totalQuantity < 1 ? 'Out of Stock' : 'Sell product'}
                onClick={() => setIsSellingProduct(true)}
              />
            </div>

            {/* has incomplete product */}
            {data.leftOver && data.leftOver.length !== 0 && (
              <div className="hasLeftOver" onClick={() => setOpenleftOvers(true)}>
                <span>
                  <Icons.AlertIcon className="alert_icon" />
                </span>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* leftOver */}
      {openleftOvers && (
        <LeftOverProducts
          open={openleftOvers}
          onOpenChange={setOpenleftOvers}
          productData={data}
          setOpenSellLeftOverForm={setOpenSellLeftOverForm}
          setLeftOverProductInfo={setLeftOverProductInfo}
        />
      )}

      {/* product details modal */}
      {!isPending && (
        <ProductDetailsModal
          open={showProductDetails}
          onOpenChange={setShowProductDetails}
          categoryData={categoryData!}
          productData={data}
        />
      )}

      {/* Sellproduct modal */}
      {isSellingProduct && (
        <SellProductModal
          onOpen={isSellingProduct}
          onOpenChange={setIsSellingProduct}
          data={data}
        />
      )}

      {/* sell left overform */}
      {openSellLeftOverForm && (
        <SellLeftOverForm
          open={openSellLeftOverForm}
          onOpenChange={setOpenSellLeftOverForm}
          data={leftOverProductInfo!}
        />
      )}
    </>
  )
}

export default ProductBox
