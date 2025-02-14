import { Input } from '@renderer/components/inputs'
import AlertModal from '@renderer/components/ui/alertModal'
import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { toastUI } from '@renderer/components/ui/toast'
import { createCategoryformVariants } from '@renderer/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'

type ColorInputTypes = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: () => void
  backFn: () => void
  setDefaultValues: (values: AddProductDefaultValueTypes) => void
}

export const ColorInput = ({
  handleProceed,
  backFn,
  setDefaultValues,
  defaultValues
}: ColorInputTypes) => {
  const [openAddColor, setOpenAddColor] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const emptyInput = defaultValues.colors.filter(
      (i, key) => i.quantity === 0 && defaultValues.colorCustomInputsIndex.includes(key)
    )

    if (emptyInput.length > 0)
      return toastUI.error('Enter value for any input you created or delete it')

    handleProceed()
  }

  //   set value when any input is change
  const onValueChange = (value: number, index: number) => {
    defaultValues.colors[index].quantity = value

    setDefaultValues({
      ...defaultValues
    })
  }

  //   Fn: to remove a custome input
  const removeInput = (index: number) => {
    defaultValues.colors = defaultValues.colors.filter((_, key) => key !== index)

    setDefaultValues({
      ...defaultValues
    })
  }

  return (
    <>
      <motion.div
        variants={createCategoryformVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <form onSubmit={onSubmit} className="form">
          <div className="form_container color_form">
            <h3>Enter quantity of avaliable product for each colour</h3>

            <div className="box_con">
              {defaultValues.colors.map((i, key) => {
                return (
                  <div key={key} className="box_wrapper">
                    <div className="box">
                      <h5>{i.name}:</h5>{' '}
                      <Input
                        onChange={(e) => onValueChange(e.target.value, key)}
                        value={defaultValues.colors[key].quantity}
                        type="number"
                        placeholder="Enter quantity"
                      />
                    </div>

                    {defaultValues.colorCustomInputsIndex.includes(key) && (
                      <span className="close_btn" onClick={() => removeInput(key)}>
                        <Icons.CloseIcon className="close_icon" />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            <button className="add_field" onClick={() => setOpenAddColor(true)} type="button">
              Add new colour
            </button>
          </div>

          <div className="btn btn_multi">
            <Button text={'Back'} varient="outline" onClick={backFn} />
            <Button text={'Proceed'} type="submit" />
          </div>
        </form>
      </motion.div>

      <AddFieldModal
        open={openAddColor}
        setOpen={setOpenAddColor}
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

    const alredyExist = defaultValues.colors.filter(
      (i) => i.name.trim().toLowerCase() === value.trim().toLowerCase()
    )

    if (alredyExist.length > 0) return toastUI.error('Field already exist ')

    defaultValues.colorCustomInputsIndex = [
      ...defaultValues.colorCustomInputsIndex,
      defaultValues.colors.length
    ]

    defaultValues.colors = [
      ...defaultValues.colors,
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
          placeholder="Enter new color"
          label="Enter new color"
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
