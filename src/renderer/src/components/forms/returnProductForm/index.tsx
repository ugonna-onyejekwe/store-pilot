import { useState } from 'react'
import { SelectCategory } from './enterCategory'
import { SelectModel } from './enterModel'

const ReturnProductForm = () => {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState<ReturnedProductType>({
    category: '',
    productId: ''
  })

  const onSubmit = () => {}

  return (
    <div>
      {formStep === 1 && (
        <SelectCategory formData={formData} setFormData={setFormData} setFormStep={setFormStep} />
      )}
      {formStep === 2 && (
        <SelectModel formData={formData} setFormData={setFormData} setFormStep={setFormStep} />
      )}
    </div>
  )
}

export default ReturnProductForm
