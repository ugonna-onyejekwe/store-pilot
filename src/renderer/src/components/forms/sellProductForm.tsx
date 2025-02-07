import { useFormik } from 'formik'
import { Input, SelecInput } from '../inputs'
import Button from '../ui/Button'
import { sellProductSchema } from './schemas'

const SellProductForm = () => {
  const initialvalues = {
    category: '',
    modal: '',
    color: '',
    design: '',
    quantity: 1
  }
  const onSubmit = (values) => {
    console.log(values)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialvalues,
    validationSchema: sellProductSchema,
    onSubmit
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="form_container">
        <SelecInput
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]}
          onChange={setFieldValue}
          errorMsg={errors.category}
          touched={touched.category}
          label="Select category"
          placeholder="Category..."
          name="category"
          id="category"
        />

        <SelecInput
          label="Select modal"
          placeholder="Modal..."
          errorMsg={errors.modal}
          touched={touched.modal}
          id={'modal'}
          name="modal"
          onChange={setFieldValue}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]}
        />

        <SelecInput
          label="Select color"
          placeholder="Category..."
          onChange={setFieldValue}
          errorMsg={errors.color}
          touched={touched.color}
          id="color"
          name="color"
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]}
        />

        <SelecInput
          label="Select design"
          placeholder="Design..."
          onChange={handleChange('design')}
          errorMsg={errors.design}
          touched={touched.design}
          options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]}
          id="design"
          name="design"
        />

        <Input
          label="Enter quantity"
          placeholder="quantity..."
          value={values.quantity}
          onChange={handleChange('quantity')}
          errorMsg={errors.quantity}
          touched={touched.quantity}
          type="number"
        />
      </div>

      <div className="btn">
        <Button text="Add to cart" type="submit" />
      </div>
    </form>
  )
}

export default SellProductForm
