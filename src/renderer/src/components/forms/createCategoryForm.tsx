import { ApiEndPoints } from '@renderer/lib/apiEndpoints'
import axios from 'axios'
import { useFormik } from 'formik'
import { BooleanInput, Input } from '../inputs'
import Button from '../ui/Button'
import { toastUI } from '../ui/toast'
import { AddCategoryFormSchema } from './schemas'

export const CreateCategoryForm = ({
  setOpenSuccessMsgCon
}: {
  setOpenSuccessMsgCon: (value: boolean) => void
}) => {
  const initialvalues = {
    name: '',
    hasSize: false,
    hasColor: false,
    hasDesign: false,
    hasSubProducts: false,
    hasVariations: false,
    sizes: '',
    subProducts: '',
    variations: '',
    variablesSubproducts: '',
    colors: '',
    designs: ''
  }

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/${ApiEndPoints.createCategory}`,
        values
      )

      if (response.status === 201) {
        resetForm()
        setOpenSuccessMsgCon(true)
        return
      }
    } catch (error) {
      toastUI.error(error.response.data.message)
    }
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: initialvalues,
      validationSchema: AddCategoryFormSchema,
      onSubmit
    })

  return (
    <form onSubmit={handleSubmit}>
      <div className="form_container">
        <Input
          label="Enter category name"
          placeholder="Name...."
          value={values.name}
          onChange={handleChange('name')}
          touched={touched.name}
          errorMsg={errors.name}
        />

        {/* has sizes starts */}
        <BooleanInput
          label="Does this category have sizes?"
          value={values.hasSize}
          onChange={setFieldValue}
          name="hasSize"
        />

        {values.hasSize && (
          <Input
            label="Enter category sizes separating each with a comma(',')."
            placeholder="Size 1, Size 2, Size 3,...."
            value={values.sizes}
            onChange={handleChange('sizes')}
            touched={touched.sizes}
            errorMsg={errors.sizes}
          />
        )}
        {/* has sizes ends */}

        {/* has variations starts */}
        <BooleanInput
          label="Does this category have variations?"
          value={values.hasVariations}
          onChange={setFieldValue}
          name="hasVariations"
        />

        {values.hasVariations && (
          <Input
            label="Enter category variations separating each with a comma(',')."
            placeholder="Variation 1, Variation 2, Variation 3,...."
            value={values.variations}
            onChange={handleChange('variations')}
            touched={touched.variations}
            errorMsg={errors.variations}
          />
        )}

        {values.hasVariations && (
          <Input
            label="List products that each variation is supposed to have separating each with a comma(',')."
            placeholder="Table, Chair"
            value={values.variablesSubproducts}
            onChange={handleChange('variablesSubproducts')}
            touched={touched.variablesSubproducts}
            errorMsg={errors.variablesSubproducts}
          />
        )}
        {/* has variations ends */}

        {/* has subproducts starts */}
        <BooleanInput
          label="Does this category have sub-products?"
          value={values.hasSubProducts}
          onChange={setFieldValue}
          name="hasSubProducts"
        />

        {values.hasSubProducts && (
          <Input
            label="Enter category sub-products separating each with a comma(',')."
            placeholder="Product 1, Product 2, Product 3,...."
            value={values.subProducts}
            onChange={handleChange('subProducts')}
            touched={touched.subProducts}
            errorMsg={errors.subProducts}
          />
        )}
        {/* has subproducts ends */}

        {/* has colour */}
        <BooleanInput
          label="Does this category have colours?"
          value={values.hasColor}
          onChange={setFieldValue}
          name="hasColor"
        />

        {values.hasColor && (
          <Input
            label="Enter category colours separating each with a comma(',')."
            placeholder="Color 1, Color 2, Color 3,...."
            value={values.colors}
            onChange={handleChange('colors')}
            touched={touched.colors}
            errorMsg={errors.colors}
          />
        )}
        {/* has colour ends*/}

        {/* has design */}
        <BooleanInput
          label="Does this category have designs?"
          value={values.hasDesign}
          onChange={setFieldValue}
          name="hasDesign"
        />

        {values.hasDesign && (
          <Input
            label="Enter category designs separating each with a comma(',')."
            placeholder="Design 1, Design 2, Design 3,...."
            value={values.designs}
            onChange={handleChange('designs')}
            touched={touched.designs}
            errorMsg={errors.designs}
          />
        )}
        {/* has design ends */}
      </div>

      <div className="btn">
        <Button text="Create category" type="submit" />
      </div>
    </form>
  )
}
