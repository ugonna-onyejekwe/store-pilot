import { Input } from '@renderer/components/inputs'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

type SizeInputTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

export const SizeInput = ({
  handleProceed,
  backFn,
  setDefaultValues,
  defaultValues
}: SizeInputTypes) => {
  const [openAddSizes, setOpenAddSizes] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    const emptyInput = defaultValues.sizes.filter(
      (i, key) => i.quantity === 0 && defaultValues.sizesCustomInputsIndex.includes(key)
    )

    if (emptyInput.length > 0)
      return toastUI.error('Enter value for any input you created or delete it')

    handleProceed()
  }

  const onValueChange = (value, index) => {
    defaultValues.sizes[index].quantity = value

    setDefaultValues({
      ...defaultValues
    })
  }

  //   Fn: to remove a custome input
  const removeInput = (index: number) => {
    defaultValues.sizes = defaultValues.sizes.filter((_, key) => key !== index)

    setDefaultValues({
      ...defaultValues
    })
  }

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <form onSubmit={onSubmit} className="form">
          <div className="form_container size_form">
            <h3>Enter quantity of avaliable product for each size</h3>

            <div className="box_con">
              {defaultValues.sizes.map((i, key) => {
                return (
                  <div key={key} className="box_wrapper">
                    <div className="box">
                      <h5>{i.name}:</h5>{' '}
                      <Input
                        onChange={(e) => onValueChange(e.target.value, key)}
                        value={defaultValues.sizes[key].quantity}
                        type="number"
                        placeholder="Enter quantity"
                      />
                    </div>

                    {defaultValues.sizesCustomInputsIndex.includes(key) && (
                      <span className="close_btn" onClick={() => removeInput(key)}>
                        <Icons.CloseIcon className="close_icon" />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
            <button className="add_field" onClick={() => setOpenAddSizes(true)} type="button">
              Add new size
            </button>
          </div>

          <div className="btn btn_multi">
            <Button text={'Back'} varient="outline" onClick={backFn} />
            <Button text={'Proceed'} type="submit" />
          </div>
        </form>
      </motion.div>

      <AddFieldModal
        open={openAddSizes}
        setOpen={setOpenAddSizes}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
      />
    </>
  )
}

type addFieldModalTypes = {
  open: boolean
  setOpen: (value: boolean) => void
  defaultValues: AddProductDefaultValueTypes
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

const AddFieldModal = ({ open, setOpen, defaultValues, setDefaultValues }: addFieldModalTypes) => {
  const [value, setValue] = useState('')

  const addField = () => {
    if (value === '') return toastUI.error('Enter a value')

    const alredyExist = defaultValues.sizes.filter(
      (i) => i.name.trim().toLowerCase() === value.trim().toLowerCase()
    )

    if (alredyExist.length > 0) return toastUI.error('Field already exist ')

    defaultValues.sizesCustomInputsIndex = [
      ...defaultValues.sizesCustomInputsIndex,
      defaultValues.sizes.length
    ]

    defaultValues.sizes = [
      ...defaultValues.sizes,
      {
        name: value,
        quantity: 0
      }
    ]

    setDefaultValues({ ...defaultValues })
    setValue('')

    setOpen(false)
  }

  return (
    <AlertModal isCloseable open={open} onOpenChange={setOpen}>
      <div className="enter_new_color_modal">
        <Input
          placeholder="Enter new size"
          label="Enter new size"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <div className="btn">
          <Button text="Add" type="button" onClick={addField} />
        </div>
      </div>
    </AlertModal>
  )
}
