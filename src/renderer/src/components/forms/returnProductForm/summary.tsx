import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SummaryTypes = {
  formData: ReturnedProductType
  nextStep: () => void
  handleSubmit: () => void
  productData: ProductResponse
  categoryData: SingleCategoryResponse
}

export const Summary = ({
  formData,
  // nextStep,
  productData,
  // handleSubmit,
  categoryData
}: SummaryTypes) => {
  const color = productData.colors.find((i) => i.id === formData.color)
  const size = productData.sizes.find((i) => i.id === formData.size)
  const design = productData.designs.find((i) => i.id === formData.design)

  const { hasColor, hasDesign, hasModel, hasSize, hasSubProducts } = categoryData

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <div className="summary_con">
          <div className="summary_header">
            <h3>Product summary</h3>
            <p>Cross check your data once again before publishing</p>
          </div>

          <div className="info_con">
            <p>
              Product category: <span>{productData.category.name}</span>
            </p>

            {hasModel && (
              <p>
                Product model: <span>{productData.model}</span>
              </p>
            )}

            {!hasModel && (
              <p>
                Quantity: <span>{formData.quantity}</span>
              </p>
            )}

            {hasSize && (
              <p>
                Size: <span>{size?.name}</span>
              </p>
            )}

            {hasColor && (
              <p>
                Colour: <span>{color?.name}</span>
              </p>
            )}

            {hasDesign && (
              <p>
                Design: <span>{design?.name}</span>
              </p>
            )}

            <p>
              Product status: <span>{formData.returnDisposition.toUpperCase()}</span>
            </p>

            {hasSubProducts && (
              <div className="subproduct">
                <h3>List of Sub-products</h3>

                {formData.subproducts.map((i, key) => (
                  <p key={key}>
                    {i.name} <span>{i.inputedQuantity}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="btn btn_multi">
            {/* <Button text={'Edit'} varient="outline" onClick={prevStep} />
            <Button text={'Submit'} type="submit" isLoading={isLoading} onClick={nextStep} /> */}
          </div>
        </div>
      </motion.div>
    </>
  )
}
