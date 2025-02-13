import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SummaryTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  categoryData: SingleCategoryResponse
}

export const Summary = ({ handleProceed, defaultValues, categoryData, backFn }: SummaryTypes) => {
  const {
    name: categoryName,
    hasModel,
    hasSize,
    hasColor,
    hasDesign,
    hasSubProducts
  } = categoryData

  return (
    <motion.div
      variants={createCategoryformVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="summary_con">
        <div className="summary_header">
          <h3>Product summary</h3>
          <p>Cross check your data once again before publishing</p>
        </div>

        <div className="info_con">
          <div className="general_info_con">
            <p>
              Product category: <span>{categoryName}</span>
            </p>
            {hasModel && (
              <p>
                Product model: <span>{defaultValues.model}</span>
              </p>
            )}
            <p>
              Total available quantity: <span>{defaultValues.totalQuantity}</span>
            </p>
            {hasModel && (
              <p>
                cartoons per product: <span>{defaultValues.cartoonQuantity}</span>
              </p>
            )}
          </div>

          {hasSize && (
            <div className="sizes_con">
              <h3>Available sizes & their quantity</h3>

              <div className="con">
                {defaultValues.sizes.map((i, key) => (
                  <p key={key}>
                    {i.name}: <span>{i.quantity}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {hasSubProducts && (
            <div className="subproduct_con">
              <h3>Available subproducts for their modal</h3>

              <div className="con">
                {defaultValues.subProducts.map(
                  (i, key) =>
                    i.available && (
                      <p key={key}>
                        <span>
                          <Icons.CheckIcon className="check_icon" />
                        </span>{' '}
                        {i.name}
                      </p>
                    )
                )}
              </div>
            </div>
          )}

          {hasColor && (
            <div className="subproduct_con">
              <h3>Available colors & their quantity</h3>

              <div className="con">
                {defaultValues.colors.map((i, key) => (
                  <p key={key}>
                    {i.name}:<span>{i.quantity}</span>{' '}
                  </p>
                ))}
              </div>
            </div>
          )}

          {hasDesign && (
            <div className="subproduct_con">
              <h3>Available designs & their quantity</h3>

              <div className="con">
                {defaultValues.designs.map((i, key) => (
                  <p key={key}>
                    {i.name}:<span>{i.quantity}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="btn btn_multi">
          <Button text={'Edit'} varient="outline" onClick={backFn} />
          <Button text={'Add product'} type="submit" />
        </div>
      </div>
    </motion.div>
  )
}
