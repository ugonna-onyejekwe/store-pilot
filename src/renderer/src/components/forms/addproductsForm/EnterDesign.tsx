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

type EnterDesignProps = {
  defaultValues: AddProductDefaultValueTypes
  handleProceed: (values: AddProductDefaultValueTypes) => void
  previousFormFn: () => void
}

const EnterDesign = ({ defaultValues, handleProceed, previousFormFn }: EnterDesignProps) => {
  const [openAddField, setAddField] = useState(false)
  const [previousDesigns, setpreviosDesigns] = useState()
  const [color, setColor] = useState()

  const onSubmit = (values) => {
    let err = false
    defaultValues.colours.map((i) => {
      values.designs.map((design) => {
        if (design.colorName === i.name) {
          const cumQuantity = design.designs.reduce(
            (accumulator, item) => Number(accumulator) + Number(item.availableQuantity),
            0
          )

          if (cumQuantity !== Number(i.availableQuantity)) {
            toastUI.error(
              `Quantity of designs under ${i.name} doesn't tally: ${i.name}-${i.availableQuantity}`
            )
            err = true
            return
          }
        }
      })
    })

    if (!err) {
      handleProceed(values)
    }
  }

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      designs: defaultValues.designs
    },
    onSubmit
  })

  useEffect(() => {
    if (defaultValues.designs.length === 0) {
      const designs = defaultValues.colours.map((color) => ({
        colorName: color.name,
        colorId: color.id,
        designs: defaultValues.categoryData?.designs.map((design) => ({
          name: design.name,
          availableQuantity: 0,
          id: design.id
        }))
      }))

      setFieldValue('designs', designs)
    } else {
      const designs = defaultValues.colours.map((color) => {
        const existedDesign = defaultValues.designs.find((i) => i.colorName === color.name)

        if (!existedDesign) {
          return {
            colorName: color.name,
            colourId: color.id,
            designs: defaultValues.categoryData?.designs.map((design) => ({
              name: design,
              availableQuantity: 0,
              id: design.id
            }))
          }
        }

        return existedDesign
      })

      setFieldValue('designs', designs)
    }
  }, [])

  // fn: remove field
  const removeField = (key: number, colour: string) => {
    values.designs = values.designs.map((i) => {
      if (i.colorName === colour) {
        i.designs = i.designs.filter((_, index) => index !== key)

        return i
      } else {
        return i
      }
    })

    setFieldValue('designs', values.designs)
  }

  return (
    <>
      <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
        <form onSubmit={handleSubmit} className="form">
          <div className="form_container enter_design_form">
            <h3>Enter designs & quantity of products available for each design</h3>

            <div className="box_wrapper">
              {values.designs.map((colour, key) => (
                <div key={key} className="box_con">
                  <h4>{colour.colorName}</h4>

                  <div className="input_boxes">
                    {colour.designs.map((design, index) => (
                      <div key={index} className="input_col">
                        <Input
                          placeholder="Enter quantity"
                          label={design.name}
                          value={design.availableQuantity}
                          onChange={(e) => {
                            const value = e.target.value
                            values.designs[key].designs[index].availableQuantity = value

                            setFieldValue('designs', values.designs)
                          }}
                        />

                        <span
                          onClick={() => removeField(index, colour.colorName)}
                          className="close_btn"
                        >
                          <Icons.CloseIcon className="close_icon" />
                        </span>
                      </div>
                    ))}

                    <div className="add_field_btn_con">
                      <button
                        className="add_field_btn"
                        onClick={() => {
                          // @ts-expect-error:undefined
                          setColor(colour.colorName)
                          // @ts-expect-error:undefined
                          setpreviosDesigns(colour.designs)
                          setAddField(true)
                        }}
                        type="button"
                      >
                        Add field
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
          values.designs = values.designs.map((i) => {
            if (i.colorName === color) {
              // @ts-expect-error:undefined
              i.design = i.designs.push({
                name: formData.fieldName,
                availableQuantity: 1,
                id: uuidv4()
              })

              return i
            } else {
              return i
            }
          })

          setFieldValue('designs', values.designs)
        }}
        // @ts-expect-error:undefined
        previousValues={previousDesigns?.map((i) => i.name)}
      />
    </>
  )
}

export default EnterDesign
