import Button from '@renderer/components/ui/Button'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
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
  const onSubmit = (e) => {
    e.preventDefault()

    const subProductExist = defaultValues.subProducts.find((i) => i.available === true)

    if (!subProductExist) return toastUI.error("All sub product can't be missing")

    handleProceed()
  }

  const onCheckChange = (checked, index) => {
    defaultValues.subProducts[index].available = checked ? true : false

    setDefaultValues({
      ...defaultValues
    })
  }

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={onSubmit} className="form">
        <div className="form_container subproduct_form">
          <h3>Check availability of all sub products</h3>

          <div className="box_con">
            {defaultValues.subProducts.map((i, key) => {
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
