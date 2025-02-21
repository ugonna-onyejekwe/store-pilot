import { ProductResponse } from '@renderer/apis/products/getSingleProduct'
import { animateY } from '@renderer/lib/utils'
import { motion } from 'framer-motion'

type SummaryTypes = {
  formData: ReturnedProductType
  setFormData: (values: ReturnedProductType) => void
  nextStep: () => void
  prevStep: () => void
  productData: ProductResponse
  isLoading: boolean
}

export const Summary = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  isLoading,
  productData
}: SummaryTypes) => {
  const initialValues = {
    size: formData.size
  }

  return (
    <>
      {!isLoading && (
        <motion.div variants={animateY} initial="initial" animate="animate" exit="exit">
          summary
        </motion.div>
      )}
    </>
  )
}
