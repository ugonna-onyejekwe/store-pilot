import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SizeInputTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

const SubProductForm = ({
  handleProceed,
  backFn,
  setDefaultValues,
  defaultValues
}: SizeInputTypes) => {
  console.log(defaultValues.subProducts, 'sub')

  const onSubmit = (e) => {
    e.preventDefault()
    handleProceed()
  }

  const onCheckChange = (checked, index) => {
    defaultValues.subProducts[index].available = checked ? true : false

    setDefaultValues({
      ...defaultValues
    })
  }

  return (
    <motion.div
      variants={createCategoryformVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form onSubmit={onSubmit} className="form">
        <div className="form_container subproduct_form">
          <h3>Check availability of all sub products</h3>

          <div className="box_con">
            {defaultValues.subProducts.map((i, key) => {
              console.log(i)
              return (
                <div key={key} className="box">
                  <input
                    type="checkbox"
                    onChange={(e) => onCheckChange(e.target.checked, key)}
                    checked={defaultValues.subProducts[key].available ?? false}
                    className="check_box_input"
                  />
                  {i.name}
                </div>
              )
            })}
          </div>
        </div>

        <div className="btn btn_multi">
          <Button text={'Back'} varient="outline" onClick={backFn} />
          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}

export default SubProductForm
