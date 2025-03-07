import Button from '@renderer/components/ui/Button'
import { Icons } from '@renderer/components/ui/icons'
import { BooleanInput, Input } from '@renderer/components/ui/inputs'
import { toastUI } from '@renderer/components/ui/toast'
import { animateY } from '@renderer/lib/utils'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { boolean } from 'yup'
import { EnterSubProductSchema } from '../schemas'

type EnterVariationFormTypes = {
  defaultValues: CreateCategoryFormInitialvalues
  handleChange: (values: CreateCategoryFormInitialvalues) => void
  setFormSteps: (value: number) => void
}

export const EnterSubProductForm = ({
  defaultValues,
  setFormSteps,
  handleChange: setValues
}: EnterVariationFormTypes) => {
  // InitialValues
  const initialValues = {
    hasSubProducts: defaultValues.hasSubProducts,
    subProducts: defaultValues.subProducts
  }

  // on submit function
  const onSubmit = (values) => {
    if (defaultValues.hasSubcategories && values.hasSubProducts) {
      const emptyInputs = values.subProducts.filter((i) => {
        const filledInputs = i.subProducts.filter((product) => product.name !== '')

        if (filledInputs.length === 0) {
          toastUI.error('Pls add sub product for each section')
          return i
        }
      })

      if (emptyInputs.length === 0) {
        setValues(values)
        setFormSteps(4)
        return
      }
      return
    }

    if (values.hasSubProducts && values.subProducts.length === 0) {
      toastUI.error('List of sub-products and their default quantity is required')
      return
    }

    const emptyField = values.subProducts.find((i) => i.name === '')

    if (emptyField) {
      toastUI.error(`Pls, fill all input field you have created.`)

      return
    }

    setValues(values)
    setFormSteps(4)
  }

  // initialize formik
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: EnterSubProductSchema,
    onSubmit
  })

  // Intailizing input fields if has subcategories
  useEffect(() => {
    if (defaultValues.hasSubcategories === true) {
      const subcategories = defaultValues.subcategories.split(',').filter(boolean)

      const subproductList = subcategories.map((i) => ({
        subCategoryName: i.trim(),
        subProducts: [{ name: '', defaultQuantity: 1 }]
      }))

      setFieldValue('subProducts', subproductList)
    }
  }, [])

  // Function to add field
  const addField = (subCateName?: string) => {
    if (defaultValues.hasSubcategories) {
      values.subProducts.map((i) => {
        if (subCateName === i.subCategoryName) {
          i.subProducts?.push({ name: '', defaultQuantity: 1 })

          return i
        } else {
          return i
        }
      })

      setFieldValue('subProducts', values.subProducts)

      return
    }

    values.subProducts.push({ name: '', defaultQuantity: 1 })
    setFieldValue('subProducts', values.subProducts)
  }

  // Fucntion to remove field
  const removeField = (key: number, subCateName?: string) => {
    if (defaultValues.hasSubcategories) {
      values.subProducts.map((i) => {
        if (subCateName === i.subCategoryName) {
          i.subProducts = i.subProducts?.filter((_, index) => index !== key)

          return i
        } else {
          return i
        }
      })

      setFieldValue('subProducts', values.subProducts)

      return
    }

    values.subProducts = values.subProducts.filter((_, index) => index !== key)
    setFieldValue('subProducts', values.subProducts)
  }

  // This runs and add a default field when their is no field.
  useEffect(() => {
    if (values.subProducts.length === 0 && values.hasSubProducts) {
      addField()
    }
  }, [values])

  // Function to set custum field values
  const onFieldChange = (value: any, key: number, name: string, subCateName?: string) => {
    // When there is subcategories
    if (defaultValues.hasSubcategories) {
      values.subProducts.map((i) => {
        if (subCateName === i.subCategoryName) {
          if (name === 'name') {
            i.subProducts?.map((i, index) => {
              if (index === key) {
                i.name = value
                return i
              }
              return i
            })
          }

          if (name === 'defaultQuantity') {
            i.subProducts?.map((i, index) => {
              if (index === key) {
                i.defaultQuantity = value
                return i
              }
              return i
            })
          }

          return i
        } else {
          return i
        }
      })

      setFieldValue('subProducts', values.subProducts)

      return
    }

    // When there is no subcategories
    if (name === 'name') {
      values.subProducts[key].name = value
      setFieldValue('subProducts', values.subProducts)
    }
    if (name === 'defaultQuantity') {
      values.subProducts[key].defaultQuantity = value
      setFieldValue('subProducts', values.subProducts)
    }
  }

  return (
    <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
      <form onSubmit={handleSubmit} className="form">
        <div className="form_container">
          <BooleanInput
            label="Does this category have sub-products?"
            value={values.hasSubProducts}
            onChange={setFieldValue}
            name="hasSubProducts"
          />

          {values.hasSubProducts && (
            <>
              <div className="sub_product_field_wrapper">
                {defaultValues.hasSubcategories ? (
                  <h3>
                    Enter sub-products name and their default quantities for each subcategory.
                  </h3>
                ) : (
                  <h3>Enter sub-products name and their default quantities.</h3>
                )}

                {defaultValues.hasSubcategories === true ? (
                  <>
                    {values.subProducts.map((category, key) => (
                      <div key={key} className="SubCategories_products">
                        <h4>{category.subCategoryName}</h4>

                        {category.subProducts?.map((i, key) => (
                          <div className="box_con" key={key}>
                            <div className="input_wrapper">
                              <Input
                                label="Name"
                                placeholder="Eg: Clock"
                                value={i.name}
                                onChange={(e) =>
                                  onFieldChange(
                                    e.target.value,
                                    key,
                                    'name',
                                    category.subCategoryName
                                  )
                                }
                              />

                              <Input
                                label="Default quantity"
                                placeholder="Default quantity"
                                value={i.defaultQuantity}
                                onChange={(e) =>
                                  onFieldChange(
                                    e.target.value,
                                    key,
                                    'defaultQuantity',
                                    category.subCategoryName
                                  )
                                }
                                type="number"
                              />
                            </div>

                            <span
                              className="close"
                              onClick={() => removeField(key, category.subCategoryName)}
                            >
                              <Icons.CloseIcon className="close_icon" />
                            </span>
                          </div>
                        ))}

                        <div className="add_field_btn">
                          <button onClick={() => addField(category.subCategoryName)} type="button">
                            Add field
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="sub_product_input_con">
                    {values.subProducts.map((i, key) => (
                      <div key={key} className="box_con">
                        <div className="input_wrapper">
                          <Input
                            label="Name"
                            placeholder="Eg: Clock"
                            value={i.name}
                            onChange={(e) => onFieldChange(e.target.value, key, 'name')}
                          />

                          <Input
                            label="Default quantity"
                            placeholder="Default quantity"
                            value={i.defaultQuantity}
                            onChange={(e) => onFieldChange(e.target.value, key, 'defaultQuantity')}
                            type="number"
                          />
                        </div>

                        <span className="close" onClick={() => removeField(key)}>
                          <Icons.CloseIcon className="close_icon" />
                        </span>
                      </div>
                    ))}

                    <div className="add_field_btn">
                      <button onClick={() => addField()} type="button">
                        Add field
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="btn btn_multi">
          <Button text="Back" onClick={() => setFormSteps(2)} varient="outline" />

          <Button text={'Proceed'} type="submit" />
        </div>
      </form>
    </motion.div>
  )
}
