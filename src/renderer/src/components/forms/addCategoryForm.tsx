import { useFormik } from 'formik'
import { BooleanInput, Input } from '../inputs'
import Button from '../ui/Button'
import { AddCategoryFormSchema } from './schemas'

const AddCategoryForm = () => {
  const initialvalues = {
    name: '',
    hasSize: false,
    hasColor: false,
    hasDesign: false
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  const { values, touched, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
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
        />

        <BooleanInput
          label="Does this category have sizes?"
          value={values.hasSize}
          onChange={setFieldValue}
          name="hasSize"
        />
      </div>

      <div className="btn">
        <Button text="Add category" type="submit" />
      </div>
    </form>
  )
}

export default AddCategoryForm
