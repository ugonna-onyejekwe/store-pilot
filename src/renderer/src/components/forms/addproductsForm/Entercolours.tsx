import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { Input } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AddfieldModal from './AddfieldModal'

type EntercoloursProps = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  previousFormFn: () => void
}

const Entercolours = ({ defaultValues, handleProceed, previousFormFn }: EntercoloursProps) => {
  const [openAddField, setAddField] = useState(false)
  const onSubmit = (values) => {
    const cumQuantity = values.colours.reduce(
      (accumulator, colour) => Number(accumulator) + Number(colour.availableQuantity),
      0
    )
    if (cumQuantity !== defaultValues.totalAvailableProduct) {
      toastUI.error(
        `Total quantity of colours not equal to total available good (${defaultValues.totalAvailableProduct}) `
      )

      return
    }

    handleProceed(values)
  }

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: { colours: defaultValues.colours },
    onSubmit
  })

  // Initiate input fields
  useEffect(() => {
    if (defaultValues.colours.length === 0) {
      const colors = defaultValues.categoryData?.colors.map((i) => ({
        name: i.name,
        availableQuantity: 0,
        id: i.id
      }))

      setFieldValue('colours', colors)
    }
  }, [])

  // fn: remove field
  const removeField = (key: number) => {
    values.colours = values.colours.filter((_, index) => index !== key)

    setFieldValue('colours', values.colours)
  }

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <form onSubmit={handleSubmit} className="form">
          <div className="form_container enter_color_form">
            <h3>Enter quantity of products available for each colour</h3>
            <div className="input_box_con">
              {values.colours.map((color, key) => (
                <div key={key} className="box">
                  <Input
                    label={color.name}
                    placeholder="Enter quantity"
                    value={values.colours[key].availableQuantity}
                    onChange={(e) => {
                      const value = e.target.value
                      values.colours[key].availableQuantity = value
                      setFieldValue('colours', values.colours)
                    }}
                    type="number"
                  />

                  <span onClick={() => removeField(key)} className="close_btn">
                    <Icons.CloseIcon className="close_icon" />
                  </span>
                </div>
              ))}

              <div className="add_field_btn_con">
                <button className="add_field_btn" onClick={() => setAddField(true)} type="button">
                  Add field
                </button>
              </div>
            </div>
          </div>

          <div className="btn btn_multi">
            <Button text="Back" varient="outline" onClick={previousFormFn} />

            <Button text={'Proceed'} type="submit" />
          </div>
        </form>
      </motion.div>

      <AddfieldModal
        open={openAddField}
        onOpenChange={setAddField}
        label="Enter new colour name"
        handleProceed={(formData) => {
          values.colours.push({ name: formData.fieldName, availableQuantity: 1, id: uuidv4() })

          setFieldValue('colours', values.colours)
        }}
        previousValues={values.colours.map((i) => i.name)}
      />
    </>
  )
}

export default Entercolours
