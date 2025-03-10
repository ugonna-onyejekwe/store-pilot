import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SummaryTypes = {
  formData: ReturnedProductType
  nextStep: () => void
  handleSubmit: () => void
  categoryData: SingleCategoryResponse
}

export const Summary = ({
  formData,
  // nextStep,
  // handleSubmit,
  categoryData
}: SummaryTypes) => {
  const { hasColor, hasModel, hasSubcategories, hasSubProducts } = categoryData

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
              Product category: <span>{formData.categoryData?.name}</span>
            </p>

            {hasModel && (
              <p>
                Product model: <span>{formData.productId}</span>
              </p>
            )}

            {!hasModel && (
              <p>
                Quantity: <span>{formData.quantity}</span>
              </p>
            )}

            {hasSubcategories && (
              <p>
                Sub-category: <span>{formData.subcategory}</span>
              </p>
            )}

            {hasColor && (
              <p>
                Colour: <span>{formData.color}</span>
              </p>
            )}

            {hasColor && (
              <p>
                Design: <span>{formData.design}</span>
              </p>
            )}

            <p>
              Product status: <span>{formData.returnDisposition.toUpperCase()}</span>
            </p>

            {/* {hasSubProducts && (
              <div className="subproduct">
                <h3>List of Sub-products</h3>

                {formData.subproducts.map((i, key) => (
                  <p key={key}>
                    {i.name} <span>{i.inputedQuantity}</span>
                  </p>
                ))}
              </div>
            )} */}
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
