import { Input } from '@renderer/components/inputs'
import Button from '@renderer/components/ui/Button'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SizeInputTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

const SizeInput = ({ handleProceed, backFn, setDefaultValues, defaultValues }: SizeInputTypes) => {
  const onSubmit = (e) => {
    e.preventDefault()
    handleProceed()
  }

  const onValueChange = (value, index) => {
    defaultValues.sizes[index].quantity = value

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
        <div className="form_container size_form">
          <h3>Enter quantity of avaliable product for each size</h3>

          <div className="box_con">
            {defaultValues.sizes.map((i, key) => {
              return (
                <div key={key} className="box">
                  <h5>{i.name}:</h5>{' '}
                  <Input
                    onChange={(e) => onValueChange(e.target.value, key)}
                    value={defaultValues.sizes[key].quantity}
                    type="number"
                    placeholder="Enter quantity"
                  />
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

export default SizeInput
