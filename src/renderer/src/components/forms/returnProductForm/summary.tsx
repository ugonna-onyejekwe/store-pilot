import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import { useReturnSingleProduct } from '@renderer/apis/products/getSingleProduct'
import Button from '@renderer/components/ui/Button'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type SummaryTypes = {
  formData: ReturnedProductType
  nextStep: () => void
  handleSubmit: () => void
  categoryData: SingleCategoryResponse
  proceed: () => void
  prevStep: () => void
  isLoading: boolean
}

export const Summary = ({ formData, proceed, prevStep, categoryData, isLoading }: SummaryTypes) => {
  const { hasColor, hasModel, hasSubcategories, hasSubProducts } = categoryData

  const { isPending, data, mutate } = useReturnSingleProduct()

  useEffect(() => {
    mutate({ productId: formData.productId })
  }, [])

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <div className="summary_con">
          <div className="summary_header">
            <h3>Product summary</h3>
            <p>Cross check your entries once again before proceeding</p>
          </div>

          <div className="info_con">
            <div className="general_info">
              <p>
                Product category: <span>{formData.categoryData?.name}</span>
              </p>

              {hasModel && (
                <p>
                  Product model: <span>{isPending ? 'Fetching...' : data?.model}</span>
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
            </div>

            {hasSubProducts && (
              <div className="subproduct">
                <h3>List of Sub-products</h3>

                {formData.subproducts.map((i, key) => (
                  <p key={key}>
                    {i.name} <span>{i.inputedQuantity}</span>{' '}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="btns">
            <Button text={'Edit'} varient="outline" onClick={prevStep} />
            <Button text={'Submit'} type="submit" isLoading={isLoading} onClick={proceed} />
          </div>
        </div>
      </motion.div>
    </>
  )
}
