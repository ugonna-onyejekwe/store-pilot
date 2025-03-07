import Button from '@renderer/components/ui/Button'
import { Input } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SubProductQuantitiesProps = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  isLoading: boolean
}

export const SubProductQuantities = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isLoading
}: SubProductQuantitiesProps) => {
  const onSubmit = (e) => {
    e.preventDefault()

    const cumulatedSizeQuantity = formData.subproducts.reduce(
      (sum, product) => Number(sum) + Number(product.inputedQuantity),
      0
    )

    if (cumulatedSizeQuantity <= 0) {
      toastUI.error("Number of sub products can't be zero")

      return
    }

    nextStep()
  }

  return (
    <>
      {!isLoading && (
        <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
          <form onSubmit={onSubmit} className="form sub_product_quantities_con">
            <h3>Enter quantity for each sub product</h3>

            <div className="form_con">
              {formData.subproducts.map((i, key) => (
                <div className="box_con" key={key}>
                  <Input
                    label={i.name}
                    placeholder="Enter quantity"
                    value={i.inputedQuantity}
                    onChange={(e) => {
                      formData.subproducts[key].inputedQuantity = e.target.value

                      setFormData({ ...formData })
                    }}
                    onBlur={() => {
                      if (i.inputedQuantity > i.defaultQuantity) {
                        formData.subproducts[key].inputedQuantity = i.defaultQuantity

                        setFormData({ ...formData })

                        toastUI.error(`product can be greater than ${i.defaultQuantity}`)
                        return
                      }

                      if (i.inputedQuantity < 0) {
                        formData.subproducts[key].inputedQuantity = 0

                        setFormData({ ...formData })

                        toastUI.error(`product can be less than zero`)
                        return
                      }
                    }}
                  />
                  <span>{i.defaultQuantity}</span>
                  <p>Max number of this product is {i.defaultQuantity}</p>
                </div>
              ))}
            </div>

            <div className="btn btn_multi">
              <Button text={'Back'} varient="outline" onClick={prevStep} />

              <Button text={'Proceed'} type="submit" />
            </div>
          </form>
        </motion.div>
      )}
    </>
  )
}
