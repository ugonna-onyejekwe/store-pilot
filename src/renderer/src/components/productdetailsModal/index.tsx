import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory.js'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct.js'
import { Link } from 'react-router-dom'
import Button from '../ui/Button/index.js'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

type ProductDetailsModal = {
  open: boolean
  onOpenChange: (value: boolean) => void
  categoryData: SingleCategoryResponse
  productData: ProductResponse
}

const ProductDetailsModal = ({
  open,
  onOpenChange,
  categoryData,
  productData
}: ProductDetailsModal) => {
  const availableSizes = categoryData?.hasSize
    ? productData.sizes.filter((i) => i.quantity > 0)
    : []
  const availableColor = categoryData?.hasColor
    ? productData.colors.filter((i) => i.quantity > 0)
    : []
  const availableDesigns = categoryData?.hasDesign
    ? productData.designs.filter((i) => i.quantity > 0)
    : []

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="product_details_modal">
        <h2>Product details</h2>
        <div className="txt_con">
          <p className="txt">
            Category: <b>{productData?.category.name}</b>
          </p>

          {categoryData?.hasModel && (
            <p className="txt">
              Model: <b>{productData.model}</b>
            </p>
          )}

          <p className="txt">
            Quantity left: <b>{productData.totalQuantity}</b>
          </p>

          {categoryData?.hasModel && (
            <p className="txt">
              Cartoons per product: <b>{productData.cartoonsPerProduct}</b>
            </p>
          )}
        </div>

        {/* Available sizes */}
        {categoryData?.hasSize && (
          <div className="available_color_con">
            <h3>Avaliable sizes:</h3>

            {availableColor.length === 0 ? (
              <h5>No size left</h5>
            ) : (
              <div className="con">
                {availableSizes?.map((size, key) => {
                  return (
                    <span key={key}>
                      <b>• {size.name}:</b> <b>{size.quantity} </b>
                      in stock
                    </span>
                  )
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
              <h5>No colour left</h5>
            ) : (
              <div className="con">
                {availableColor?.map((color, key) => {
                  return (
                    <span key={key}>
                      <b>• {color.name}:</b> <b>{color.quantity} </b>
                      in stock
                    </span>
                  )
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
              <h5>No design left</h5>
            ) : (
              <div className="con">
                {availableDesigns?.map((design, key) => (
                  <span key={key}>
                    <b>• {design.name}:</b> <b>{design.quantity} </b>in stock
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="btns">
          <Link to={`/add-product/edit/${productData.category.id}/${productData.productId}`}>
            <Button text="Edit product" varient="outline" />
          </Link>

          <Button text="Sell product" />
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal
