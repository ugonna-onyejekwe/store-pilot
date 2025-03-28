import { ProductResponse } from '@renderer/apis/products/getSingleProduct.js'
import Button from '../ui/Button'
import { Modal } from '../ui/modal.tsx'
import './styles.scss'

type ProductDetailsModal = {
  open: boolean
  onOpenChange: (value: boolean) => void
  productData: ProductResponse
}

const ProductDetailsModal = ({ open, onOpenChange, productData }: ProductDetailsModal) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className="Product_details_con">
        <div className="head">
          <h2>Product details </h2>
        </div>

        <div className="general_info_con">
          <p>
            Category name: <span> {productData.categoryName}</span>
          </p>

          <p>
            Quantity left: <span> {productData.totalQuantity} sets</span>
          </p>
          {productData.hasModel && (
            <p>
              Model: <span>{productData.model}</span>
            </p>
          )}
          {productData.hasSubCategory && (
            <p>
              Sub-categories: <span>{productData.subCategory}</span>
            </p>
          )}
        </div>

        {productData.hasSubProducts && (
          <div className="con">
            <h3>SubProducts</h3>

            <div className="subProducts_con">
              {productData.subProducts.map((i, key) => (
                <p key={key}>• {i.name}</p>
              ))}
            </div>
          </div>
        )}

        {productData.hasColors && (
          <div className="con">
            <h3>Colours</h3>

            <div className="subProducts_con">
              {productData.colors.map((i, key) => (
                <p key={key}>
                  • {i.name} - {i.availableQuantity}
                </p>
              ))}
            </div>
          </div>
        )}

        {productData.hasDesigns && (
          <div className="con">
            <div className="design_con">
              {productData.designs.map((i, key) => (
                <div key={key} className="design_inner_wrapper">
                  <h4>
                    Designs under <span>{i.colorName}</span>
                  </h4>

                  <div className="design_wrapper">
                    {i.designs.map((d, index) => (
                      <p key={index}>
                        • {d.name} - {d.availableQuantity}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="btn">
          <Button text="View left Overs" onClick={() => {}} varient="outline" />

          <Button text={'Edit'} type="submit" onClick={() => {}} />
        </div>
      </div>
    </Modal>
  )
}

export default ProductDetailsModal
