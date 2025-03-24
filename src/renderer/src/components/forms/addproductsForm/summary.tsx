import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SummaryProps = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  previousFormFn: () => void
  isLoading: boolean
}

const Summary = ({ defaultValues, handleProceed, isLoading, previousFormFn }: SummaryProps) => {
  return (
    <motion.div
      variants={animateY}
      initial="initial"
      animate="animate"
      exit="exit"
      className="summary_con"
    >
      <div className="info_con">
        <p>
          Category: <span>{defaultValues.categoryData?.name}</span>
        </p>
        {defaultValues.categoryData?.hasSubcategories && (
          <p>
            Sub-category: <span>{defaultValues.subcategory}</span>
          </p>
        )}
        {defaultValues.categoryData?.hasModel && (
          <p>
            Model: <span>{defaultValues.model}</span>
          </p>
        )}
        <p>
          Total quantity available: <span>{defaultValues.totalAvailableProduct}</span>
        </p>
        {defaultValues.actionType === 'new' && (
          <p>
            Cartoons per set: <span>{defaultValues.cartoonsPerSet}</span>
          </p>
        )}
      </div>

      {defaultValues.actionType === 'new' && defaultValues.categoryData?.hasSubProducts && (
        <div className="subproducts">
          <h3>Available subproducts </h3>
          <div className="box_con">
            {defaultValues.subProducts.map((i, key) => (
              <p key={key}>
                <span>
                  <Icons.CheckIcon className="check_icon" />
                </span>

                {i.name}
              </p>
            ))}
          </div>
        </div>
      )}

      {defaultValues.categoryData?.hasColor && (
        <div className="colors_design_con">
          {defaultValues.designs.map((i, key) => (
            <div key={key}>
              <h3>
                List of designs under <span> {i.colorName}</span> colour:
              </h3>
              <div className="list_con">
                {i.designs.map((design, index) => (
                  <p key={index}>
                    {design.name}: <span>{design.availableQuantity}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="btn btn_multi">
        <Button text="Back" varient="outline" onClick={previousFormFn} />

        <Button
          text={defaultValues.actionType === 'update' ? 'Update product' : 'Create product'}
          type="submit"
          onClick={handleProceed}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  )
}

export default Summary
