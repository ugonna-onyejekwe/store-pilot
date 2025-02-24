import { SingleCategoryResponse } from '@renderer/apis/categories/getSingleCategory'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY, convertAmount } from '@renderer/lib/utils'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

type SummaryTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  categoryData: SingleCategoryResponse
  isLoading: boolean
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

export const Summary = ({
  isLoading,
  handleProceed,
  defaultValues,
  categoryData,
  backFn
}: SummaryTypes) => {
  const {
    name: categoryName,
    hasModel,
    hasSize,
    hasColor,
    hasDesign,
    hasSubProducts
  } = categoryData

  const { actionType } = useParams()
  const editing = actionType && actionType === 'edit' ? true : false

  const availableSizes = hasSize ? defaultValues.sizes.filter((i) => i.quantity > 0) : []
  const availableColors = hasColor ? defaultValues.colors.filter((i) => i.quantity > 0) : []
  const availableSubproducts = hasSubProducts
    ? defaultValues.subProducts.filter((i) => i.available === true)
    : []
  const availableDesigns = hasDesign ? defaultValues.designs.filter((i) => i.quantity > 0) : []

  const cumulatedSizeQuantity = availableSizes.reduce(
    (sum, size) => Number(sum) + Number(size.quantity),
    0
  )
  const cumulatedColorQuantity = availableColors.reduce(
    (sum, size) => Number(sum) + Number(size.quantity),
    0
  )
  const cumulatedDesignQuantity = availableDesigns.reduce(
    (sum, size) => Number(sum) + Number(size.quantity),
    0
  )

  const submit = () => {
    if (
      hasSize &&
      (cumulatedSizeQuantity > defaultValues.totalQuantity ||
        cumulatedSizeQuantity < defaultValues.totalQuantity)
    )
      return toastUI.error('Pls, fix quanity issues')

    if (
      hasColor &&
      (cumulatedColorQuantity > defaultValues.totalQuantity ||
        cumulatedColorQuantity < defaultValues.totalQuantity)
    )
      return toastUI.error('Pls, fix quanity issues')

    if (
      hasDesign &&
      (cumulatedDesignQuantity > defaultValues.totalQuantity ||
        cumulatedDesignQuantity < defaultValues.totalQuantity)
    )
      return toastUI.error('Pls, fix quanity issues')

    handleProceed()
  }

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
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
                Last price for this model: <span>{convertAmount(defaultValues.lastPrice)}</span>
              </p>
            )}

            {hasModel && (
              <p>
                Cartoons per product: <span>{defaultValues.cartoonQuantity}</span>
              </p>
            )}
          </div>

          {hasSize && (
            <div className="sizes_con">
              <h3>Available sizes & their quantity</h3>

              <div className="con">
                {availableSizes.length === 0 ? (
                  <p style={{ color: '#e86310' }}>No size is avaliable</p>
                ) : (
                  availableSizes.map(
                    (i, key) =>
                      i.quantity !== 0 && (
                        <p key={key}>
                          {i.name}: <span>{i.quantity}</span>
                        </p>
                      )
                  )
                )}
              </div>

              {(cumulatedSizeQuantity > defaultValues.totalQuantity ||
                cumulatedSizeQuantity < defaultValues.totalQuantity) && (
                <p className="err_msg">
                  {`Total available product which is ${defaultValues.totalQuantity} does not tally with total available sizes  which is ${cumulatedSizeQuantity}`}{' '}
                </p>
              )}
            </div>
          )}

          {hasSubProducts && (
            <div className="subproduct_con">
              <h3>Available subproducts for this modal</h3>

              <div className="con">
                {availableSubproducts.length === 0 ? (
                  <p style={{ color: '#e86310' }}>No subproduct is avaliable</p>
                ) : (
                  availableSubproducts.map((i, key) => (
                    <p key={key}>
                      <span>
                        <Icons.CheckIcon className="check_icon" />
                      </span>{' '}
                      {i.name}
                    </p>
                  ))
                )}
              </div>
            </div>
          )}

          {hasColor && (
            <div className="subproduct_con">
              <h3>Available colours & their quantity</h3>

              <div className="con">
                {availableColors.length === 0 ? (
                  <p style={{ color: '#e86310' }}>No color is avaliable</p>
                ) : (
                  availableColors.map(
                    (i, key) =>
                      i.quantity !== 0 && (
                        <p key={key}>
                          {i.name}:<span>{i.quantity}</span>{' '}
                        </p>
                      )
                  )
                )}
              </div>

              {(cumulatedColorQuantity > defaultValues.totalQuantity ||
                cumulatedColorQuantity < defaultValues.totalQuantity) && (
                <p className="err_msg">
                  {`Total available product which is ${defaultValues.totalQuantity} does not tally with total available colours  which is ${cumulatedColorQuantity}`}{' '}
                </p>
              )}
            </div>
          )}

          {hasDesign && (
            <div className="subproduct_con">
              <h3>Available designs & their quantity</h3>

              <div className="con">
                {availableDesigns.length === 0 ? (
                  <p style={{ color: '#e86310' }}>No Design is avaliable</p>
                ) : (
                  availableDesigns.map(
                    (i, key) =>
                      i.quantity !== 0 && (
                        <p key={key}>
                          {i.name}:<span>{i.quantity}</span>
                        </p>
                      )
                  )
                )}
              </div>

              {(cumulatedDesignQuantity > defaultValues.totalQuantity ||
                cumulatedDesignQuantity < defaultValues.totalQuantity) && (
                <p className="err_msg">
                  {`Total available product which is ${defaultValues.totalQuantity} does not tally with total available designs  which is ${cumulatedDesignQuantity}`}{' '}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="btn btn_multi">
          <Button text={'Edit'} varient="outline" onClick={backFn} />
          <Button
            text={editing ? 'Update product' : 'Add product'}
            type="submit"
            isLoading={isLoading}
            onClick={submit}
          />
        </div>
      </div>
    </motion.div>
  )
}
