import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { Input } from '@renderer/components/ui/inputs'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
    handleProceed(values)
  }

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      designs: defaultValues.designs
    },
    onSubmit
  })

  useEffect(() => {
    if (defaultValues.designs.length === 0) {
      const designs = defaultValues.colours.map((i) => ({
        colorName: i.name,
        designs: defaultValues.categoryData?.designs.map((i) => ({
          name: i,
          availableQuantity: 0
        }))
      }))

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
                          setColor(colour.colorName)
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
              i.design = i.designs.push({
                name: formData.fieldName,
                availableQuantity: 1
              })

              return i
            } else {
              return i
            }
          })

          setFieldValue('designs', values.designs)
        }}
        previousValues={previousDesigns?.map((i) => i.name)}
      />
    </>
  )
}

export default EnterDesign
